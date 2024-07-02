import React from 'react';
import Image from 'next/image';

export default function FolderItem({ folder }) {
  
  return (
    <div className='w-full flex flex-col justify-center items-center h-[110px] md:h-[150px] shadow-lg rounded-lg p-2 hover:scale-105 hover:shadow-md'>
      <div className='flex justify-center items-center w-full'>
        <Image src='/folder.png' alt='folder' width={80} height={80} className='object-contain' />
      </div>
      <h2 className='line-clamp-2 text-[12px] text-center mt-2'>{folder ? folder.name : ""}

      
        </h2>
      
    </div>
  );
}
