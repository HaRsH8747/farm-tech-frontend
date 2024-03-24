// DropdownFilter.js
import React, { useState } from 'react';

const DropdownFilter = ({ title, items, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative mb-4">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-gray-200 w-full text-left rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring"
      >
        {title}
        <span className="float-right">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 p-2 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md m-1 hover:bg-gray-200">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox rounded text-blue-500 h-5 w-5"
                  value={item}
                  onChange={(e) => onChange(e, item)}
                />
                <span>{item}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;