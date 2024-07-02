"use client"
import React from "react";
import Image from "next/image";
function StorageDetailItem({item}) {
  if(item.size == 0.0) return (<></>)
  return (
    <>
        <div className='flex justify-between
        items-center mt-3 border-b-[1px] pb-2'>
       <div className='flex items-center gap-4'>
       <Image
                    src={`/${item.type}.png`}
                    alt="file-icon"
                    width={26}
                    height={20}
                />
        <div>
            <h2 className='text-[14px] font-semibold'>{item.type}</h2>
            <h2 className='text-[12px] mt-[-4px] text-gray-400'>{item.totalFile} Files</h2>
        </div>
       </div>
        <div className='font-semibold'>{(item.size/1024**2).toFixed(2)} MB</div>
      </div> 
    </>
  );
}

export default StorageDetailItem;