import React from 'react';

const NotificationSkeleton = () => {
  return (
    /* W-full to match the new card layout, with rounded-22px */
    <div className="w-full bg-white border border-slate-100 rounded-[22px] p-4 shadow-sm animate-pulse">
      <div className="flex flex-col gap-4">
        
        <div className="flex items-start gap-3">
          {/* Avatar Squircle Skeleton */}
          <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />

          {/* Text Content Skeleton */}
          <div className="flex flex-col gap-2 w-full pt-1">
            {/* Sender Name + Message Line */}
            <div className="h-4 bg-slate-100 rounded-md w-3/4" />
            {/* Timestamp Line */}
            <div className="h-2 bg-slate-50 rounded-md w-1/4" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center gap-2">
          {/* Decline Button Skeleton */}
          <div className="flex-1 h-10 rounded-xl bg-slate-50" />
          {/* Accept Button Skeleton */}
          <div className="flex-1 h-10 rounded-xl bg-slate-100" />
        </div>
        
      </div>
    </div>
  );
};

export default NotificationSkeleton;