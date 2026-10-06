const TripDetailsSkeleton = () => {
    return (
      <div className="fixed flex items-center justify-between w-screen h-[65px] top-[70px] bottom-[-70px] rounded-[28px] bg-gray-200 px-3 z-10 animate-pulse">
        <div className="w-[261px] flex items-center justify-start">
          <div className="ml-1 w-[50px] h-[50px] bg-gray-300 rounded-full" />
          <div className="w-[200px] flex flex-col justify-center items-start ml-2">
            <div className="w-32 h-6 bg-gray-300 rounded mb-1" />
            <div className="w-20 h-4 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  };
  
  export default TripDetailsSkeleton;
  