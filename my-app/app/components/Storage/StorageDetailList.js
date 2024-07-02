"use client";
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
    const { refresh } = useRefresh();
    const types = {
        png: [0, 0.0],
        pdf: [0, 0.0],
        txt: [0, 0.0],
        docx: [0, 0.0],
        cpp: [0, 0.0],
        py: [0, 0.0],
        others: [0, 0.0],  // Added 'others' category
    };

    useEffect(() => {
        if (session) {
            const fetchFiles = async () => {
                const fileQuery = query(collection(db, "files"), where("createdBy", "==", session.user.email));
                const querySnapshot = await getDocs(fileQuery);
                const files = [];
                querySnapshot.forEach((doc) => {
                    files.push(doc.data());
                });

                files.forEach((item) => {
                    if (types.hasOwnProperty(item.type)) {
                        types[item.type][0]++;
                        types[item.type][1] += item.size;
                    } else {
                        types.others[0]++;
                        types.others[1] += item.size;
                    }
                });

                const newStorageList = [];
                for (const key in types) {
                    newStorageList.push({
                        type: key,
                        size: types[key][1],
                        totalFile: types[key][0]
                    });
                }
                setStorageList(newStorageList);
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
