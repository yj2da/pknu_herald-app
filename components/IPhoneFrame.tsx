import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-900 dark:border-gray-800 bg-gray-900 border-[8px] rounded-[3rem] h-[640px] w-[320px] shadow-2xl overflow-visible">
      {/* Notch */}
      <div className="w-[100px] h-[25px] bg-gray-900 top-0 left-1/2 -translate-x-1/2 absolute z-20 rounded-b-[1.25rem]"></div>
      
      {/* Volume Buttons */}
      <div className="h-[40px] w-[3px] bg-gray-900 absolute -left-[11px] top-[110px] rounded-l-lg"></div>
      <div className="h-[40px] w-[3px] bg-gray-900 absolute -left-[11px] top-[160px] rounded-l-lg"></div>
      
      {/* Power Button */}
      <div className="h-[60px] w-[3px] bg-gray-900 absolute -right-[11px] top-[130px] rounded-r-lg"></div>
      
      {/* Content */}
      <div className="rounded-[2.5rem] overflow-hidden w-full h-full bg-white dark:bg-black relative">
        <div className="h-full overflow-y-auto scrollbar-hide pt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
