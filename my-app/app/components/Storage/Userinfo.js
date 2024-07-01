import React from 'react'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
export default function Userinfo() {
  const {data:session} = useSession();
  return (
    <div>{
        session?<div>
            <Image src={session.user.image} alt='user-image' width={40} height={40} />
        </div>:null
        }</div>
  )
}
