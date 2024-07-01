// components/Folder/CreateFolderModal.js
"use client";
import Image from "next/image";
import React, { useState } from "react";
import app from "@/Config/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useData } from "@/context/DataProvider";
import { useFolderData } from "@/context/FolderContext";
import { useRefresh } from "@/context/ReloadContext";
function CreateFolderModal() {
    const docId = Date.now().toString();
    const [folderName, setFolderName] = useState('');
    const { state, setState } = useData();
    const { folderState, setFolderState } = useFolderData();
    const { data: session } = useSession();
    const {refresh, setRefresh} = useRefresh();
    const db = getFirestore(app);

    const onCreate = async (e) => {
        e.preventDefault(); 
        try {
            await setDoc(doc(db, "Folders", docId), {
                name: folderName,
                id: docId,
                createBy: session.user.email,
                parentFolderId: folderState.parentFolderId
            });

            // Update folder list
            setState(prevState => ({
                ...prevState,
                FolderList: [
                    ...prevState.FolderList,
                    { id: docId, name: folderName, createBy: session.user.email, parentFolderId: folderState.parentFolderId }
                ],
                value: 'Folder Created!',
                preview: true,
            }));

            setRefresh((prev)=>({...prev,reload:!refresh.reload}))

            // Reset folder name input
            setFolderName('');

        } catch (error) {
            console.error("Error creating folder: ", error);
            setState({ value: 'Error creating folder.', preview: true });
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full ">
            <form method="dialog" className="modal-box p-9 items-center flex flex-col justify-center gap-3 w-full max-w-sm">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black">
                    ✕
                </button>
                <div className="w-full items-center flex flex-col justify-center gap-3 text-black">
                    <Image src="/folder.png" alt="folder" width={50} height={50} />
                    <input
                        type="text"
                        value={folderName}
                        placeholder="Folder Name"
                        className="p-2 m-5 border-[1px] outline-none rounded-md w-full bg-white text-black"
                        onChange={(e) => setFolderName(e.target.value)}
                    />
                    <button className="bg-blue text-white rounded-md p-2 px-3 w-full " onClick={onCreate}>
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateFolderModal;
