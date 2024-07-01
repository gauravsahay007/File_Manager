"use client";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import moment from "moment/moment";
import Image from "next/image";
import React, { useContext, useState } from "react";
import app from "@/Config/FirebaseConfig";
import { useData } from "@/context/DataProvider";
import { useRefresh } from "@/context/ReloadContext";
function FileItem({ file }) {
    const db = getFirestore(app);
    const {refresh, setRefresh} = useRefresh();
    const image = "/" + file.type + ".png";
    const { state: toastMessage, setState: setToastMessage } = useData();
    const {state, setState} = useData();
    const deleteFile = async (file) => {
        try {
            await deleteDoc(doc(db, "files", file.id.toString()));
            setToastMessage('File Deleted!!!');
            setRefresh((prev)=>({...prev,reload:!refresh.reload}))
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    const openFile = () => {
        window.open(file.imageUrl, "_blank");
    };

    return (
        <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 shadow-md gap-3 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md hover:shadow-md hover:scale-105 m-2"
        >
            <div className="flex items-center col-span-2 lg:col-span-3" onClick={openFile}>
                <Image
                    src={image}
                    alt="file-icon"
                    width={26}
                    height={20}
                />
                <h2
                    className="text-[15px] truncate ml-2 cursor-pointer"
                >
                    {file.name}
                </h2>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <h2 className="text-[12px] md:text-[15px]">
                    {moment(file.modifiedAt).format("MMMM DD, YYYY")}
                </h2>
            </div>
            <div className="flex items-center col-span-1 lg:col-span-1">
                <h2 className="text-[15px] mr-2">
                    {(file.size / 1024 ** 2).toFixed(2) + " MB"}
                </h2>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => deleteFile(file)}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-red-500 hover:scale-110 transition-all cursor-pointer"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </div>
        </div>
    );
}

export default FileItem;
