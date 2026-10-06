import React from 'react';

const IndiMemberSkeleton = () => {
  return (
    <div className="flex w-full h-[71px] px-2 mt-3 justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)] animate-pulse">
      <div className="px-1 justify-center items-center flex gap-3">
        <div className="w-[55px] h-[55px] rounded-[14px] bg-gray-300"></div>
        <div className="flex flex-col gap-2">
          <div className="w-[120px] h-[20px] bg-gray-300 rounded-md"></div>
          <div className="w-[180px] h-[14px] bg-gray-200 rounded-md"></div>
        </div>
      </div>
      {/* Uncomment if you want to include totalSpend skeleton too */}
      {/* 
      <div className="flex items-center pr-3">
        <div className="w-[50px] h-[20px] bg-gray-300 rounded-md"></div>
      </div>
      */}
    </div>
  );
};

export default IndiMemberSkeleton;
