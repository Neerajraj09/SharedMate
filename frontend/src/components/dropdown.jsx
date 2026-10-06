import React from 'react';

const Dropdown = ({ setStatusFilter, statusFilter }) => {
  const handleChange = (e) => {
    setStatusFilter(e.target.value); // Update the status filter state
  };

  return (
      <div className='w-full'>
        <select
          id="statusDropdown"
          value={statusFilter}
          onChange={handleChange}
          className="w-full max-w-screen px-2 py-2 text-gray-700 border-2 border-teal-400 rounded-[19px] bg-transparent box-border"
        >
          <option value="all">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
  );
};

export default Dropdown;
