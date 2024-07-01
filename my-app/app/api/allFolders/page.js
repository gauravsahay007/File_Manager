"use client";
import React,{useState,useEffect} from 'react';
import SideNavBar from '@/app/components/SideNavBar';
import { useData } from '@/context/DataProvider';
import FolderItem from '@/app/components/Folder/FolderItem';
import Storage from '@/app/components/Storage/Storage';
import { useRouter } from 'next/navigation';
export default function Page() {
    const { state } = useData();
    const [activeFolder, setActiveFolder] = useState();
    const router = useRouter();
    const onFolderClick = (index, item) => {
      setActiveFolder(index);
      router.push(`/api/folder/${item.id}`);
  };
    return (
        <div className="flex">
            <SideNavBar />
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                <div className="md:col-span-2">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 cursor-pointer ">
                        {state.FolderList.map((item, index) => (
                            <div key={index} onClick={() => onFolderClick(index, item)}>
                                <FolderItem folder={item} />
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
        </div>
    );
}
