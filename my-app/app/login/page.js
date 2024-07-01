"use client"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
export default function Page() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
        }
    }, [status, router])

    const handleSignIn = async () => {
        await signIn()
    }

    if (status === "loading") {
        return <div>Loading...</div>
    }

    return (
        <div className='flex justify-center items-center mt-[50%]'>
            <button 
                className='bg-blue-400 p-2 rounded-xl px-3 text-white' 
                onClick={handleSignIn}
            >
                Login with Google
            </button>
        </div>
    ) 
}