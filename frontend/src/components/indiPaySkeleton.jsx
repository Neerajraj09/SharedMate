const IndiPaySkeleton = () => {
    return (
      <div className="w-full mt-3 pb-3 px-3 h-[147px] rounded-[15px] shadow-[0_4px_10px_rgba(0,0,0,0.25)] bg-[rgba(242,236,236,0.17)] animate-pulse">
        <div className="flex w-full h-[71px] justify-between rounded-[15px] mb-[1px] bg-[rgba(242,236,236,0.17)]">
          
          <div className="px-1 flex items-center gap-2">
            <div className="w-[55px] h-[55px] rounded-[14px] bg-gray-300"></div>
            
            <div className="w-[120px] h-[24px] bg-gray-300 rounded-md"></div>
          </div>
  
          <div className="flex items-center pr-1">
            <div className="w-[60px] h-[24px] bg-gray-300 rounded-md"></div>
          </div>
        </div>
  
        <div className="h-[64px] px-2 flex flex-col items-start justify-center w-auto rounded-md shadow-md bg-slate-200">
          <div className="w-[60%] h-[24px] bg-gray-300 rounded-md mb-2"></div>
          <div className="w-[40%] h-[20px] bg-gray-300 rounded-md"></div>
        </div>
      </div>
    );
  };
  
  export default IndiPaySkeleton;
  