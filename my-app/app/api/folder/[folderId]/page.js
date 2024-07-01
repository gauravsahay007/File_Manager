"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import FileItem from '@/app/components/File/FileItem'; // Adjust this import as per your file structure
import Storage from '@/app/components/Storage/Storage';
const FolderDetails = ({ params }) => {
  const [folder, setFolder] = useState(null);
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]); // State to hold files in the folder
  const { folderState, setFolderState } = useFolderData();
  const { data: session } = useSession();
  const { state: toastMessage, setState: setToastMessage } = useData();
  const { state, setState } = useData();

  const fetchFolder = useCallback(async () => {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "Folders"), where("id", "==", params.folderId));
      const querySnapshot = await getDocs(q);
      const folderData = [];
      querySnapshot.forEach(doc => {
        folderData.push({ id: doc.id, ...doc.data() });
      });
      if (folderData.length > 0) {
        setFolder(folderData[0]);
      } else {
        setFolder(null); // Handle case where folder is not found
      }
    } catch (error) {
      console.error('Error fetching folder:', error);
    }
  }, [params.folderId]);

  const getFolderList = useCallback(async () => {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "Folders"), where("parentFolderId", "==", params.folderId));
      const querySnapshot = await getDocs(q);
      const folders = [];
      querySnapshot.forEach(doc => {
        folders.push(doc.data());
      });
      setFolderList(folders);
    } catch (error) {
      console.error('Error fetching folder list:', error);
    }
  }, [params.folderId]);

  const fetchFiles = useCallback(async () => {
    try {
      const db = getFirestore(app);
      const q = query(collection(db, "files"), where("parentFolderId", "==", params.folderId));
      const querySnapshot = await getDocs(q);
      const files = [];
      querySnapshot.forEach(doc => {
        files.push({ id: doc.id, ...doc.data() });
      });
      setFileList(files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  }, [params.folderId]);

  useEffect(() => {
    if (params.folderId) {
      setFolderState(prev => ({ ...prev, parentFolderId: params.folderId }));
    }
  }, [params.folderId, setFolderState]);

  useEffect(() => {
    fetchFolder();
  }, [fetchFolder, state.reload]);

  useEffect(() => {
    if (session) {
      getFolderList();
    }
  }, [getFolderList, session, state.reload]);

  useEffect(() => {
    if (session) {
      fetchFiles();
    }
  }, [fetchFiles, session, state.reload]);

  useEffect(() => {
    if (toastMessage && toastMessage.preview) {
      const timer = setTimeout(() => {
        setToastMessage(prev => ({ ...prev, preview: false }));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  const memoizedFolderList = useMemo(() => (
    <FolderList ListName={folder ? folder.name : "Loading..."} folderList={folderList} />
  ), [folder, folderList]);

  const memoizedFileList = useMemo(() => (
    fileList.length > 0 ? (
      fileList.map(file => (
        <FileItem key={file.id} file={file} />
      ))
    ) : (
      <p>No files found.</p>
    )
  ), [fileList]);

  return (
    <div className='flex'>
      <SideNavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <div className='p-5 md:h-full'>
          <SearchBar />
          <h2 className="text-xl font-bold mb-4 ">{folder ? folder.name : "Loading..."}</h2>
          {memoizedFolderList}
        </div>
        <div className='p-5 md:h-full'>
          <div className='bg-white p-5 h-full '>
            <h2 className="text-xl font-bold mb-4">Files in {folder ? folder.name : "Loading..."}</h2>
            {memoizedFileList}
          </div>
        </div>
      </div>
      {toastMessage.preview && <Toast msg={toastMessage.value} />}
    </div>
  );
}

export default FolderDetails;
