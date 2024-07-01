"use client";
import React from 'react';
import SideNavBar from './components/SideNavBar';
import Home from './home/Home';
import { useData } from '@/context/DataProvider';
import Toast from './components/Toast';
import app from '@/Config/FirebaseConfig';
import { getFirestore } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Storage from './components/Storage/Storage';
import { useRefresh } from '@/context/ReloadContext';
export default function Page() {
  const { state: toastMessage } = useData();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const { state, setState } = useData();
  const {refresh, setRefresh} = useRefresh();
  return (
    <div className='flex text-black'>
      <SideNavBar />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        <div className='col-span-2'>
          {console.log(state)}
          <Home reload={refresh.reload} />
        </div>
        <div className="col-span-1 flex justify-center items-center bg-blue">
          <Storage />
        </div>      
      </div>  
      {toastMessage.preview ? <Toast msg={toastMessage.value} /> : null}
    </div>
  );     
}
