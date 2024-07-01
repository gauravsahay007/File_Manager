"use client";
import "../globals.css";
import Image from "next/image";
import menu from "../data/menu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CreateFolderModal from "./Folder/CreateFolderModal";
import UploadFile from "./File/UploadFile";
import { useData } from "@/context/DataProvider";
export default function SideNavBar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const {state, setState} = useData();
    const router = useRouter();
    const { data: session } = useSession();

    const onMenuClick = (item, index) => {
        setActiveIndex(index);
        router.push('/');
    };

    const showModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.showModal();
        }
    };


    return session && (
        <div className="w-[200px] bg-white h-screen sticky top-0 z-20 shadow-blue-200 shadow-md p-5">
            <div className="flex justify-center">
                <Image
                    src="/logo.png"
                    alt="logo"
                    className="cursor-pointer"
                    width={150}
                    height={60}
                    onClick={() => router.push('/')}
                />
            </div>
            <button
                onClick={() => showModal('upload_file')}
                className="flex gap-2 items-center text-[13px] bg-blue-500 p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center"
            >
                Add New File
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <button
                className="flex gap-2 items-center text-[13px] bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3 hover:scale-105 transition-all mt-1"
                onClick={() => showModal('createFolderModal')}
            >
                Create Folder
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
            <div className="mt-7">
                {menu.list.map((item, index) => (
                    <h2
                        key={index}
                        onClick={() => onMenuClick(item, index)}
                        className={`flex gap-2 items-center p-2 mt-3 text-gray-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white ${activeIndex == index ? 'bg-blue-500 text-white' : ''}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={item.logo}
                            />
                        </svg>
                        {item.name}
                    </h2>
                ))}
            </div>
            <dialog id="upload_file">
               <UploadFile closeModal={()=>window.upload_file.close()}/>
            </dialog>
            <dialog id="createFolderModal">
                <CreateFolderModal />
            </dialog>
        </div>
    );
}
