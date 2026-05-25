import React from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ children }) => {
  return (
    <div className="relative mx-auto bg-white border-[#E0E0E0] border-[10px] rounded-[3.5rem] h-[720px] w-[340px] shadow-2xl overflow-visible flex-shrink-0">
      {/* Notch Area */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#E0E0E0] rounded-b-[1.2rem] z-50 flex items-center justify-center">
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* Screen Container */}
      <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-[#F8F9FB] relative">
        <div className="h-full overflow-y-auto scrollbar-hide pt-10">
          {children}
        </div>
        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full z-50"></div>
      </div>
    </div>
  );
};

export default IPhoneFrame;
