"use client";
import React, { useEffect } from 'react';
import SideNavBar from './components/SideNavBar';
import Home from './home/Home';
import "./Home.module.css";
import { useData } from '@/context/DataProvider';
import Toast from './components/Toast';
import app from '@/Config/FirebaseConfig';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Userinfo from './components/Storage/Userinfo';

export default function Page() {
  const { state: toastMessage, setState: setToastMessage } = useData();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const {state, setState} = useData();
  

  return (
    <div className='flex'>
      <SideNavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">
        <Home />
        <div className="col-span-2">
          <div className='bg-white p-5'>
            Storage
          </div>
        </div>
      </div>
      {toastMessage.preview ? <Toast msg={toastMessage.value} /> : null}
    </div>
  );
}
