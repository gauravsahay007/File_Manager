"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '@/Config/FirebaseConfig';
import SearchBar from '../components/SearchBar';
import FolderList from '../components/Folder/FolderList';
import FileList from '../components/File/FileList';
import { useData } from '@/context/DataProvider';
import { useFolderData } from '@/context/FolderContext';

export default function Home({reload}) {
  const { data: session } = useSession();
  const router = useRouter();
  const { state, setState } = useData();
  const { folderState, setFolderState } = useFolderData();

  useEffect(() => {
    const fetchFoldersAndFiles = async () => {
      try {
        if (!session) {
          router.push("/login");
          return;
        }

        const db = getFirestore(app);
        const folderQuery = query(collection(db, "Folders"), where("createBy", "==", session.user.email));
        const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));

        const [folderSnapshot, fileSnapshot] = await Promise.all([
          getDocs(folderQuery),
          getDocs(fileQuery)
        ]);

        const folders = folderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const files = fileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setState(prev => ({ ...prev, FolderList: folders, FileList: files }));
      } catch (error) {
        console.error('Error fetching folders and files:', error);

      }
    };

    if (session) {
      fetchFoldersAndFiles();
    }
    
    setFolderState(prev => ({ ...prev, parentFolderId: 0 }));
  }, [session, router, state.reload]);

  return (
    <div className="p-5 min-h-screen bg-aliceblue flex flex-col">
      <SearchBar />
      <FolderList folderList={state.FolderList} />
      <FileList fileList={state.FileList} />
    </div>
  );
}
