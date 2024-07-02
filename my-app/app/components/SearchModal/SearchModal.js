import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function SearchModal({ item }) {
    const url = item.class==="Folder"?"folder":item.type;
    const router = useRouter();
    const HandleClick = () => {
        if(item.class === "Folder"){
            router.push(`/api/folder/${item.id}`);
        }
        else{
            window.open(item.imageUrl, "_blank");
        }
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 shadow-md gap-3 justify-between cursor-pointer hover:bg-gray-100 p-3 rounded-md hover:shadow-md hover:scale-105 m-5  cursor-pointer" onClick={()=>(HandleClick())}>
      <div className="flex items-center col-span-3 lg:col-span-3">
        <div className="relative w-8 h-8 mr-2">
          <Image
            src={`/${url}.png`}
            alt="file-icon"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h2 className="text-sm md:text-base truncate cursor-pointer">{item.name}</h2>
      </div>
      <div className="hidden md:block col-span-1 lg:col-span-1">
        <h2 className="text-sm">{item.class}</h2>
      </div>
      <div className="flex items-center col-span-1 lg:col-span-1">
        <h2 className="text-sm mr-2">{(item.size / (1024 ** 2)).toFixed(2)} MB</h2>
      </div>
    </div>
  );
}
