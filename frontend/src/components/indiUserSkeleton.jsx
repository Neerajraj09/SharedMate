import React from "react";

const IndiUserSkeleton = () => {
  return (
    <div className="flex w-full h-[71px] mt-1 justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)] animate-pulse">
      <div className="px-1 justify-center items-center flex">
        <div className="w-[50px] h-[50px] rounded-[14px] bg-gray-300" />

        <div className="flex flex-col justify-start ml-3 space-y-2">
          <div className="w-[120px] h-[18px] bg-gray-300 rounded" />
          <div className="w-[80px] h-[14px] bg-gray-200 rounded" />
        </div>
      </div>

      <div className="flex h-full mx-3 w-[90px] justify-center items-center pr-1">
        <div className="h-[40px] w-full bg-gray-300 rounded-[20px]" />
      </div>
    </div>
  );
};

export default IndiUserSkeleton;
