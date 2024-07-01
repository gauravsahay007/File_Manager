"use client"
import React, { useEffect, useState } from 'react';
import StorageDetailItem from './StorageDeatailItem';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import app from '@/Config/FirebaseConfig';
import { useData } from '@/context/DataProvider';
import { useRefresh } from '@/context/ReloadContext';
function StorageDetailList() {
    const { data: session } = useSession();
    const db = getFirestore(app);
    const [storageList, setStorageList] = useState([]);
    const {state,setState} =  useData();
    const {refresh, setRefresh} = useRefresh();
    useEffect(() => {
        if (session) {
            const fetchFiles = async () => {
                const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));
                const querySnapshot = await getDocs(fileQuery);
                const files = [];
                querySnapshot.forEach((doc) => {
                    files.push(doc.data());
                });
                setStorageList(files);
            };
            fetchFiles();
        }
    }, [session, refresh.reload]);

    return (
        <>
            {storageList.map((item, index) => (
                <StorageDetailItem item={item} key={index} />
            ))}
        </>
    );
}

export default StorageDetailList;
