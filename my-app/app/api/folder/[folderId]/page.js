"use client"
import React, { useState, useEffect } from 'react';
import app from '@/Config/FirebaseConfig';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import "../../../globals.css";
import SearchBar from '@/app/components/SearchBar';
import { useFolderData } from '@/context/FolderContext';
import Toast from '@/app/components/Toast';
import SideNavBar from '@/app/components/SideNavBar';
import { useData } from '@/context/DataProvider';
import { useSession } from 'next-auth/react';
import FolderList from '@/app/components/Folder/FolderList';

export default function FolderDetails({ params }) {
  const [folder, setFolder] = useState(null);
  const [folderList, setFolderList] = useState([]);
  const { folderState, setFolderState } = useFolderData();
  const { data: session } = useSession();
  const { state: toastMessage, setState: setToastMessage } = useData();

  useEffect(() => {
    if (params.folderId) {
      setFolderState(prev => ({ ...prev, parentFolderId: params.folderId[0] }));
    }
  }, [params.folderId, setFolderState]);
const{state,setState} = useData();
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Folders"), where("id", "==", params.folderId[0]));
        const querySnapshot = await getDocs(q);
        const folderData = [];
        querySnapshot.forEach(doc => {
          folderData.push({ id: doc.id, ...doc.data() });
        });
        setFolder(folderData[0]);
      } catch (error) {
        console.error('Error fetching folder:', error);
      }
    };

    fetchFolder();
  }, [params.folderId, state.reload]);

  useEffect(() => {
    const getFolderList = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Folders"), where("parentFolderId", "==", params.folderId[0]));
        const querySnapshot = await getDocs(q);
        const folders = [];
        querySnapshot.forEach(doc => {
          folders.push(doc.data());
        });
        setFolderList(folders)
      } catch (error) {
        console.error('Error fetching folder list:', error);
      }
    };

    if (session) {
      getFolderList();
    }
  }, [params.folderId, session, state.reload]);

  useEffect(() => {
    if (toastMessage && toastMessage.preview) {
      const timer = setTimeout(() => {
        setToastMessage(prev => ({ ...prev, preview: false }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <div className='flex'>
      <SideNavBar />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className='p-5'>
          <div >
            <SearchBar />
            <FolderList ListName={folder ? folder.name : "Loading..."} folderList={folderList} />
          </div>
        </div>
        <div className="col-span-2">
          <div className='bg-white p-5'>
            Storage
          </div>
        </div>
      </div>
      {toastMessage.preview && <Toast msg={toastMessage.value} />}
    </div>
  );
}
