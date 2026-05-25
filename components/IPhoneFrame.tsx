import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto bg-[#F8F9FB] border-[#E5E7EB] border-[6px] rounded-[3rem] h-[720px] w-[340px] shadow-2xl overflow-visible flex-shrink-0">
      {/* Top Speaker/Camera Area */}
      <div className="w-[60px] h-[4px] bg-[#E5E7EB] top-[18px] left-1/2 -translate-x-1/2 absolute z-30 rounded-full"></div>
      
      {/* Screen Content */}
      <div className="rounded-[2.6rem] overflow-hidden w-full h-full bg-white relative">
        <div className="h-full overflow-y-auto scrollbar-hide pt-12">
          {children}
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-gray-200 rounded-full z-20"></div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
