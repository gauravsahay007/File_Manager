"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export default function Userinfo() {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col gap-2 items-center justify-center'>
      {session ? (
        <div className='flex flex-col  md:flex-row gap-2 items-center justify-center'>
          <Image
            src={session.user.image}
            alt='user-image'
            width={40}
            height={40}
            className='rounded-full'
          />
          <div>
            <h2 className='text-[15px] font-bold text-center'>{session.user.name}</h2>
            <h2 className='text-[13px] text-gray-400 mt-[-4px] text-center'>{session.user.email}</h2>
          </div>
          <div className='bg-blue p-2 rounded-lg cursor-pointer width-fit text-white ml-9 item-center justify-center' onClick={() => signOut()}>
            <span className='text-sm flex items-center gap-1'>
             <p className='hidden sm:block md:block'> Logout </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-blue-500 hover:animate-pulse transition-all"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
