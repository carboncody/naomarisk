import { Input } from '@components/ui/Input';
import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface FilteredRisk {
  status: string;
  riskownerIds: string[];
  searchTerm: string;
}

interface FilterDropdownProps {
  risks: FilteredRisk[];
  onFilter: (filterTerm: string) => void;
}

export function FilterDropdown({ onFilter }: FilterDropdownProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    onFilter(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onFilter('');
  };

  return (
    <div className="w-54 relative">
      <Input
        type="text"
        placeholder="Tilføj filter..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full border-b p-2 outline-none"
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-red-500 hover:text-red-700"
        >
          <IoIosCloseCircleOutline size={20} />
        </button>
      )}
    </div>
  );
}
