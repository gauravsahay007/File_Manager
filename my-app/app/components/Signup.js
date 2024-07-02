"use client";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Signup() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    await signIn('google');
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div id="login-popup" >
    <div className="relative p-2 ">
      <div className="relative bg-white rounded-lg shadow-lg">
        <div className="pl-6 pr-6 pt-2 pb-3">
                  <div className="mb-7 text-center">
                    <h2 className="font-semibold leading-5 text-black">Welcome to Cloudit !!</h2>
                    <p className="mt-2 text-sm leading-4 text-gray-900">Create an account now</p>
                  </div>
          <div className="flex flex-col gap-2">
            <button className="inline-flex items-center justify-center w-full h-10 gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
                <path fillRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362l-.08-9.127c-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126l-.08 13.526c0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f"></path>
              </svg>
              Continue with GitHub
            </button>
            <button onClick={handleSignIn} className="inline-flex items-center justify-center w-full h-10 gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 92" fill="none" className="h-5 w-5">
                <path d="M90 47.1c0-3.1-.3-6.3-.8-9.3H45.9v17.7h24.8c-1 5.7-4.3 10.7-9.2 13.9l14.8 11.5C85 72.8 90 61 90 47.1z" fill="#4280ef"></path>
                <path d="M45.9 91.9c12.4 0 22.8-4.1 30.4-11.1L61.5 69.4c-4.1 2.8-9.4 4.4-15.6 4.4-12 0-22.1-8.1-25.8-18.9L4.9 66.6c7.8 15.5 23.6 25.3 41 25.3z" fill="#34a353"></path>
                <path d="M20.1 54.8c-1.9-5.7-1.9-11.9 0-17.6L4.9 25.4c-6.5 13-6.5 28.3 0 41.2l15.2-11.8z" fill="#f6b704"></path>
                <path d="M45.9 18.3c6.5-.1 12.9 2.4 17.6 6.9L76.6 12C68.3 4.2 57.3 0 45.9.1c-17.4 0-33.2 9.8-41 25.3l15.2 11.8c3.7-10.9 13.8-18.9 25.8-18.9z" fill="#e54335"></path>
              </svg>
              Continue with Google
            </button>
            <button className="inline-flex items-center justify-center w-full h-10 gap-2 rounded-lg border border-gray-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 256 256">
                <g transform="translate(-26.66667,-26.66667) scale(1.20833,1.20833)">
                  <g fill="#0288d1" fillRule="nonzero">
                    <path d="M42,37c0,2.762 -2.238,5 -5,5h-26c-2.761,0 -5,-2.238 -5,-5v-26c0,-2.762 2.239,-5 5,-5h26c2.762,0 5,2.238 5,5z"></path>
                    <path d="M12,19h5v17h-5zM14.485,17h-0.028c-1.492,0 -2.457,-1.112 -2.457,-2.501c0,-1.419 0.995,-2.499 2.514,-2.499c1.521,0 2.458,1.08 2.486,2.499c0,1.388 -0.965,2.501 -2.515,2.501zM36,36h-5v-9.099c0,-2.198 -1.225,-3.698 -3.192,-3.698c-1.501,0 -2.313,1.012 -2.707,1.99c-0.144,0.35 -0.101,1.318 -0.101,1.807v9h-5v-17h5v2.616c0.721,-1.116 1.85,-2.616 4.738,-2.616c3.578,0 6.261,2.25 6.261,7.274l0.001,9.726z"></path>
                  </g>
                </g>
              </svg>
              Continue with LinkedIn
            </button>
          </div>
          <div className="flex items-center gap-2 py-6 text-sm text-gray-600">
            <div className="h-px w-full bg-gray-200"></div>
            <div className="h-px w-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}
