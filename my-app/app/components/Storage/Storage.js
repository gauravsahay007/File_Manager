"use client"
import React from 'react'
import Userinfo from './Userinfo';
import StorageInfo from './StorageInfo';
import StorageDetailList from './StorageDetailList';
import StorageUpgradeMsg from './StorageUpgradeMsg';
import { useSession } from 'next-auth/react';
function Storage() {
    const {data:session}=useSession();
  return session&&(
    <>
   
    <div className='w-[90%] p-10 bg-white rounded-md md:mt-0 mt-2'>
         <Userinfo/>
        <StorageInfo/>
        <StorageDetailList/>
        <StorageUpgradeMsg/>
    </div>
    </>
    
  )
}

export default Storage;