import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[10px] rounded-[3.5rem] h-[720px] w-[360px] shadow-2xl overflow-visible flex-shrink-0">
      {/* Notch */}
      <div className="w-[120px] h-[30px] bg-gray-900 top-0 left-1/2 -translate-x-1/2 absolute z-20 rounded-b-[1.5rem]"></div>
      
      {/* Buttons */}
      <div className="h-[40px] w-[3px] bg-gray-900 absolute -left-[13px] top-[120px] rounded-l-lg"></div>
      <div className="h-[40px] w-[3px] bg-gray-900 absolute -left-[13px] top-[170px] rounded-l-lg"></div>
      <div className="h-[60px] w-[3px] bg-gray-900 absolute -right-[13px] top-[140px] rounded-r-lg"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2.8rem] overflow-hidden w-full h-full bg-white dark:bg-black relative shadow-inner">
        <div className="h-full overflow-y-auto scrollbar-hide pt-10">
          {children}
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-200 dark:bg-gray-800 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
