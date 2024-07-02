"use client";
import React,{useState,useEffect} from 'react';
import SideNavBar from '@/app/components/SideNavBar';
import { useData } from '@/context/DataProvider';
import FolderItem from '@/app/components/Folder/FolderItem';
import Storage from '@/app/components/Storage/Storage';
import { useRouter } from 'next/navigation';
import FileItem from '@/app/components/File/FileItem';
import { useRefresh } from '@/context/ReloadContext';
import FileList from '@/app/components/File/FileList';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import app from '@/Config/FirebaseConfig';
export default function Page() {
    const { state , setState} = useData();
    const router = useRouter();
    const session = useSession();
    const {refresh, setRefresh} = useRefresh();
    const [files,setFiles] = useState(state.FileList);

    useEffect(()=>{
       const fetchFiles = async() => {
        const db = getFirestore(app);
      const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));
      const FileSnapshot  = await getDocs(fileQuery)
      let fls = [];
      setFiles(FileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
       }
       fetchFiles();
    },[session,router,refresh.reload])
    console.log(files);
    return (
        <div className="flex">
            <SideNavBar />
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                <div className="md:col-span-2">
                <div className='bg-white mt-5 p-5 rounded-lg'>
                    <h2 className='text-[18px] font-bold text-black'>My Files</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400'>
                        <div className="col-span-2 lg:col-span-3">
                            <h2>Name</h2>
                        </div>
                        <div className="col-span-1 lg:col-span-1">
                            <h2>Modified</h2>
                        </div>
                        <div className="col-span-1 lg:col-span-1">
                            <h2>Size</h2>
                        </div>
                    </div>
                    <FileList fileList = {files} name="My Files"   />
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
