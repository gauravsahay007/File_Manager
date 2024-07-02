import React, { useState, useEffect } from 'react';
import SearchModal from './SearchModal/SearchModal';
import { useSession } from 'next-auth/react';
import { useData } from '@/context/DataProvider';

export default function SearchBar() {
  const { data: session } = useSession();
  const { state } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const doQuery = (searchTerm) => {
    if (state.FolderList && state.FolderList.length > 0) {
      let res = [];
      state.FolderList.forEach((item) => {
        if (item.name.includes(searchTerm)) {
          res.push({ ...item, class: 'Folder' });
        }
      });
      state.FileList.forEach((item) => {
        if (item.type.includes(searchTerm) || item.name.includes(searchTerm)) {
          res.push({ ...item, class: 'File' });
        }
      });
      setSearchResults(res);
      setIsOpen(res.length > 0);
    } else {
      setSearchResults([]);
      setIsOpen(false); 
    }
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      doQuery(searchTerm);
    } else {
      setSearchResults([]);
      setIsOpen(false); 
    }
  }, [searchTerm]);

  return (
    <div className="relative text-black">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full text-sm px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {isOpen && searchResults.length > 0 && (
        <div id="dropdown" className="absolute z-20 top-full left-0 w-full">
          <ul className="py-2 bg-white text-sm text-black" aria-labelledby="dropdownDefaultButton">
            {searchResults.map((item, index) => (
              <li key={index}>
                <SearchModal item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
