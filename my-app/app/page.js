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
import Image from 'next/image';
import Login from './components/Login';
import { Poppins, Pacifico } from 'next/font/google';

//👇 Configure our font object
const poppins = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: "400", 
});

export default function Page() {
  const { state: toastMessage } = useData();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const { state, setState } = useData();
  const { refresh, setRefresh } = useRefresh();

  const iconListsm = [
    { url: "/cpp.png", style: { top: '-95px', left: '200px' } },
    { url: "/py.png", style: { top: '-70px', left: '175px' } },
    { url: "/js.png", style: { top: '-120px', left: '225px' } },
    { url: "/png.png", style: { top: '-77px', left: '185px' } },
    { url: "/pdf.png", style: { top: '-237px', left: '249px' } },
    { url: "/docx.png", style: { top: '-175px', left: '140px' } },
    { url: "/xlsx.png", style: { top: '-205px', left: '230px' } },
    { url: "/txt.png", style: { top: '-292px', left: '130px' } },
    { url: "/pptx.png", style: { top: '-370px', left: '135px' } },
  ];

  const iconListmd = [
    { url: "/cpp.png", style: { top: '-95px', left: '200px' } },
    { url: "/py.png", style: { top: '-80px', left: '150px' } },
    { url: "/js.png", style: { top: '-120px', left: '195px' } },
    { url: "/png.png", style: { top: '-107px', left: '172px' } },
    { url: "/pdf.png", style: { top: '-227px', left: '150px' } },
    { url: "/docx.png", style: { top: '-179px', left: '220px' } },
    { url: "/xlsx.png", style: { top: '-309px', left: '270px' } },
    { url: "/txt.png", style: { top: '-305px', left: '240px' } },
    { url: "/pptx.png", style: { top: '-284px', left: '260px' } },
  ];

  const iconListlg = [
    { url: "/cpp.png", style: { top: '-95px', left: '400px' } },
    { url: "/py.png", style: { top: '-90px', left: '300px' } },
    { url: "/js.png", style: { top: '-120px', left: '390px' } },
    { url: "/png.png", style: { top: '-137px', left: '344px' } },
    { url: "/pdf.png", style: { top: '-227px', left: '339px' } },
    { url: "/docx.png", style: { top: '-175px', left: '300px' } },
    { url: "/xlsx.png", style: { top: '-205px', left: '400px' } },
    { url: "/txt.png", style: { top: '-295px', left: '430px' } },
    { url: "/pptx.png", style: { top: '-268px', left: '350px' } },
  ];

  return (
    <>
      {session ? (
        <div className="flex text-black min-h-screen">
          <SideNavBar />
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div className="col-span-2">
              <Home reload={refresh.reload} />
            </div>
            <div className="col-span-1 flex justify-center items-center bg-blue-500">
              <Storage />
            </div>
          </div>
          {toastMessage.preview ? <Toast msg={toastMessage.value} /> : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full md:h-[100vh]">
          <div className="flex flex-col items-center justify-center relative">
            <Image src="/logo.png" alt="logo" width={350} height={200} />
            <div className="w-full h-full block sm:hidden">
              {iconListsm.map((icon, index) => (
                <Image key={index} src={icon.url} alt={`icon-${index}`} width={35} height={35} className="relative" style={icon.style} />
              ))}
            </div>
            <div className="w-full h-full hidden sm:block md:hidden">
              {iconListmd.map((icon, index) => (
                <Image key={index} src={icon.url} alt={`icon-${index}`} width={35} height={35} className="relative" style={icon.style} />
              ))}
            </div>
            <div className="w-full h-full hidden md:block">
              {iconListlg.map((icon, index) => (
                <Image key={index} src={icon.url} alt={`icon-${index}`} width={35} height={35} className="relative" style={icon.style} />
              ))}
            </div>
            <div className="hidden md:block text-black text-2xl relative bottom-40 left-6">
              <span className={poppins.className}>
                <span className="text-blue">
                  Cloudit! :
                </span>
                <span className="text-red-600"> Your Cloud,</span>
                <span className="text-amber-400"> Your Files,</span>
                <span className="text-green"> Your Way </span>
              </span> 
            </div>
          </div>
          <div className="col-span-1 flex justify-center items-center bg-blue-500 min-h-full relative bottom-60 md:right-50 sm:bottom-80 h-full  md:bottom-0">
            <Login />
          </div>
        </div>
      )}
    </>
  );
}
