"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FolderItem from './FolderItem';
import { useData } from '@/context/DataProvider';
import Link from 'next/link';
export default function FolderList({ folderList = [], isBig = true, ListName = "Recent Folders" }) {
    const [activeFolder, setActiveFolder] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { state } = useData();

    useEffect(() => {
        if (folderList.length > 0) {
            setLoading(false);
        }
    }, [folderList, state]);

    const onFolderClick = (index, item) => {
        setActiveFolder(index);
        router.push(`/api/folder/${item.id}`);
    };

    // Sort folderList by id in decreasing order
    const sortedFolderList = [...folderList].sort((a, b) => b.id - a.id);

    return (
        <div className='p-5 mt-5 bg-white rounded'>
            <div className='flex justify-between items-center'>
                <h2 className='text-17px font-bold'>{ListName}</h2>
                <Link className="text-blue-400 font-normal text-[13px] cursor-pointer" href="/api/allFolders">
          
                View All

        </Link>
            </div>
            {loading ? (
                <div className='flex justify-center items-center mt-3'>
                    <span>Oops! nothiing here...</span>
                </div>
            ) : (
                isBig ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 mt-3 gap-4 cursor-pointer'>
                        {sortedFolderList.slice(0, 4).map((item, index) => (
                            <div key={index} onClick={() => onFolderClick(index, item)}>
                                <FolderItem folder={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 mt-3'>
                        {sortedFolderList.slice(0, 4).map((item, index) => (
                            <div key={index} onClick={() => onFolderClick(index, item)}>
                                {/* <FolderItemSmall folder={item} /> */}
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}
