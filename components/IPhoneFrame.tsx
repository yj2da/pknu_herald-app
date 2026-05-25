import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-[#1c1c1e] bg-[#1c1c1e] border-[12px] rounded-[3.5rem] h-[740px] w-[360px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-visible flex-shrink-0 outline outline-1 outline-[#3a3a3c]">
      {/* Notch / Dynamic Island style */}
      <div className="w-[110px] h-[32px] bg-black top-2 left-1/2 -translate-x-1/2 absolute z-30 rounded-full shadow-inner border border-gray-800"></div>
      
      {/* Buttons */}
      <div className="h-[40px] w-[3px] bg-[#1c1c1e] absolute -left-[15px] top-[120px] rounded-l-lg border-l border-gray-700"></div>
      <div className="h-[40px] w-[3px] bg-[#1c1c1e] absolute -left-[15px] top-[170px] rounded-l-lg border-l border-gray-700"></div>
      <div className="h-[80px] w-[3px] bg-[#1c1c1e] absolute -right-[15px] top-[140px] rounded-r-lg border-r border-gray-700"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2.8rem] overflow-hidden w-full h-full bg-white relative">
        <div className="h-full overflow-y-auto scrollbar-hide pt-12">
          {children}
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-black/10 rounded-full z-20"></div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
