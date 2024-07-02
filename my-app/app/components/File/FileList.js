import React from 'react';
import FileItem from './FileItem';
import { useData } from '@/context/DataProvider';
import { useRefresh } from '@/context/ReloadContext';
function FileList({ fileList, name="" }) {
    const { state } = useData();
    return (
        <div className='bg-white p-5 rounded-lg'>
            <h2 className='text-[18px] font-bold'>{name}</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400'>
                <div className="col-span-2 lg:col-span-3">
                    <h2>Name</h2>
                </div>
                <div className="col-span-1 lg:col-span-1">
                    <h2>Modified</h2>
                </div>
                <div className="col-span-1 lg:col-span-1">
                    <h2>Size</h2>
                </div>
            </div>
            {fileList && fileList.map((item, index) => (
                <FileItem file={item} key={index} />
            ))}
        </div>
    );
}

export default FileList;
