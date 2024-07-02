"use client";
import React, { useState, useEffect } from 'react';
import SideNavBar from '@/app/components/SideNavBar';
import { useData } from '@/context/DataProvider';
import Storage from '@/app/components/Storage/Storage';
import { useRouter } from 'next/navigation';
import FileList from '@/app/components/File/FileList';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import app from '@/Config/FirebaseConfig';
import { useRefresh } from '@/context/ReloadContext';
export default function Page() {
    const { state, setState } = useData();
    const router = useRouter();
    const { data: session } = useSession();
    const { refresh, setRefresh } = useRefresh();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            console.log(refresh);
            try {
                const db = getFirestore(app);
                const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));
                const fileSnapshot = await getDocs(fileQuery);
                const fileList = fileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setFiles(fileList);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        if (session) {
            fetchFiles();
        }
    }, [session, router, refresh.reload]);

    return (
        <div className="flex">
            <SideNavBar />
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                <div className="md:col-span-2">
                    <div className='bg-white h-full rounded-lg'>   
                        <FileList fileList={files} name="My Files" />
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