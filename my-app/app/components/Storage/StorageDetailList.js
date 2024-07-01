"use client"
import React, { useEffect, useState } from 'react';
import StorageDetailItem from './StorageDetailItem';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import app from '@/Config/FirebaseConfig';
import { useData } from '@/context/DataProvider';
import { useRefresh } from '@/context/ReloadContext';

function StorageDetailList() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [storageList, setStorageList] = useState([]);
    const [otherFiles, setOtherFiles] = useState([]);
    const { state, setState } = useData();
    const { refresh, setRefresh } = useRefresh();
    const [totalSize, setTotalSize] = useState(0);
    const [otherSize, setOtherSize] = useState(0);
    const types = ["png", "pdf","txt","docx","cpp","py"]; 
    useEffect(() => {
        if (session) {
            const fetchFiles = async () => {
                const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));
                const querySnapshot = await getDocs(fileQuery);
                const files = [];
                querySnapshot.forEach((doc) => {
                    files.push(doc.data());
                });

                const filteredFiles = files.filter(item => types.includes(item.type));
                const otherFiles = files.filter(item => !types.includes(item.type));
                setStorageList(filteredFiles);
                setOtherFiles(otherFiles);

                const totalSize = filteredFiles.reduce((acc, item) => acc + item.size, 0);
                const otherSize = otherFiles.reduce((acc, item) => acc + item.size, 0);
                setTotalSize(totalSize);
                setOtherSize(otherSize);
            };
            fetchFiles();
        }
    }, [session, refresh.reload]);

    return (
        <>
            <div>Total Size of Selected Types: {totalSize} bytes</div>
            <div>Total Size of Other Files: {otherSize} bytes</div>
            {storageList.map((item, index) => (
                <StorageDetailItem item={item} key={index} />
            ))}
            {otherFiles.map((item, index) => (
                <StorageDetailItem item={item} key={index + storageList.length} />
            ))}
        </>
    );
}

export default StorageDetailList;
