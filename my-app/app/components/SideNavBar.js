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
import Link from "next/link";

export default function SideNavBar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { state, setState } = useData();
  const { data: session } = useSession();

  const onMenuClick = (index) => {
    setActiveIndex(index);
  };

  const showModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    session && (
      <div className="w-[200px] bg-white h-screen sticky top-0 z-20 shadow-blue-200 shadow-md p-5">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            className="cursor-pointer"
            width={150}
            height={50}
            onClick={() => router.push("/")}
          />
        </div>
        <button
          onClick={() => showModal("upload_file")}
          className="flex gap-2 items-center text-[13px] bg-blue p-2 text-white rounded-md px-3 hover:scale-105 transition-all mt-5 w-full justify-center"
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
          className="flex gap-2 items-center text-[13px] bg-blue w-full p-2 justify-center text-white rounded-md px-3 hover:scale-105 transition-all mt-1"
          onClick={() => showModal("createFolderModal")}
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
        <div className="mt-7 text-black">
          {menu.list.map((item, index) => (
            <Link href={item.name!=''?`/api/${item.name}`:`/`} key={index}>
              <h2
                onClick={() => onMenuClick(index)}
                className={`flex gap-2 items-center p-2 mt-3 text-black rounded-md cursor-pointer hover:bg-blue hover:text-white ${
                  activeIndex == index ? "bg-blue text-white" : ""
                }`}
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
            </Link>
          ))}
        </div>
        <dialog id="upload_file">
          <UploadFile closeModal={() => document.getElementById("upload_file").close()} />
        </dialog>
        <dialog id="createFolderModal">
          <CreateFolderModal />
        </dialog>
      </div>
    )
  );
}