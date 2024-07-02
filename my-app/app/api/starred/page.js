"use client";
import React, { useState } from 'react';
import SideNavBar from '@/app/components/SideNavBar';
import { useData } from '@/context/DataProvider';
import FolderItem from '@/app/components/Folder/FolderItem';
import Storage from '@/app/components/Storage/Storage';
import { useRouter } from 'next/navigation';
import { collection, getDocs, getFirestore, query, where, deleteDoc, doc } from 'firebase/firestore';
import app from '@/Config/FirebaseConfig';
import { useRefresh } from '@/context/ReloadContext';

export default function Page() {
    const { state, setState: setToastMessage } = useData();
    const [activeFolder, setActiveFolder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const router = useRouter();
    const { refresh, setRefresh } = useRefresh();

    const onFolderClick = (index, item) => {
        setActiveFolder(index);
        router.push(`/api/folder/${item.id}`);
    };

    const deleteFolder = async (folder) => {
        try {
            const db = getFirestore(app);
            const folderQuery1 = query(collection(db, 'Folders'), where('id', '==', folder.id));
            const folderQuery2 = query(collection(db, 'Folders'), where('parentFolderId', '==', folder.id));
            const fileQuery = query(collection(db, 'files'), where('parentFolderId', '==', folder.id));

            const [folderSnapshot1, folderSnapshot2, fileSnapshot] = await Promise.all([
                getDocs(folderQuery1),
                getDocs(folderQuery2),
                getDocs(fileQuery)
            ]);

            fileSnapshot.docs.forEach(file => {
                deleteDoc(doc(db, 'files', file.id.toString()));
            });
            folderSnapshot1.docs.forEach(folder => {
                deleteDoc(doc(db, 'Folders', folder.id.toString()));
            });
            folderSnapshot2.docs.forEach(folder => {
                deleteDoc(doc(db, 'Folders', folder.id.toString()));
            });

            setToastMessage('Folder Deleted!!!');
            setRefresh((prev) => ({ ...prev, reload: !refresh.reload }));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    };

    const openModal = (folder) => {
        setSelectedFolder(folder);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFolder(null);
    };

    return (
        <div className="flex">
            <SideNavBar />
            <div className="grid grid-cols-1 md:grid-cols-3 w-full p-5">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 cursor-pointer">
                        {state.FolderList?.filter(item => !item.starred).map((item, index) => (
                            <div key={index} className="relative">
                                <div onClick={() => onFolderClick(index, item)}>
                                    <FolderItem folder={item} />
                                </div>
                                <div className="absolute top-2 right-2">
                                    <button
                                        className="text-gray-600 hover:text-gray-900"
                                        onClick={() => openModal(item)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 110-1.5.75.75 0 010 1.5zm5.25 0a.75.75 0 110-1.5.75.75 0 010 1.5zm5.25 0a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="md:col-span-1 flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <Storage />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-lg font-semibold">Delete Folder</h2>
                        <p>Are you sure you want to delete this folder?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 mr-2 text-white bg-red-600 rounded hover:bg-red-700"
                                onClick={() => deleteFolder(selectedFolder)}
                            >
                                Delete
                            </button>
                            <button
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
