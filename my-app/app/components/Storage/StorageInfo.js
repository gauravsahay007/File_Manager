"use client";
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import app from '@/Config/FirebaseConfig';
import { useSession } from 'next-auth/react';
import StorageSize from './StorageSize';
import { useData } from '@/context/DataProvider';
import { useRefresh } from '@/context/ReloadContext';
function StorageInfo() {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  const [imageSize, setImageSize] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { state, setState } = useData();
  const {refresh, setRefresh} = useRefresh();
  const getAllFiles = async () => {
    if (!session?.user?.email) return;

    const q = query(
      collection(db, 'files'),
      where('createdBy', '==', session.user.email)
    );
    const querySnapshot = await getDocs(q);
    const files = [];
    let totalSize = 0;

    querySnapshot.forEach((doc) => {
      totalSize += doc.data().size;
      files.push(doc.data());
    });

    setFileList(files);
    setTotalSizeUsed((totalSize / 1024 ** 2).toFixed(2) + ' MB');
  };

  useEffect(() => {
    if (session) {
      getAllFiles();
    }
  }, [session, refresh.reload]);

  useEffect(() => {
    if (fileList.length > 0) {
      setImageSize(StorageSize.getStorageByType(fileList, ['png', 'jpg']));
    }
  }, [fileList]);

  return (
    <div className="mt-7">
      <h2 className="text-[15px] md:text-[22px] font-bold">
        {totalSizeUsed} <span className="text-[14px] font-medium">used of</span> 50 MB
      </h2>
      <div className="w-full bg-gray h-2.5 flex">
        <div className="bg-blue h-2.5 w-[25%]"></div>
        <div className="bg-green h-2.5 w-[35%]"></div>
        <div className="bg-yellow h-2.5 w-[15%]"></div>
      </div>
    </div>
  );
}

export default StorageInfo;
