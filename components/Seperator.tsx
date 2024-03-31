import React from "react";

const Seperator = ({px}:{px:string}) => {
  return (
    <div className={`w-full px-[${px}] my-2`}>
      <hr className="ml-[30px] border-[#292a2b] border-1" />
    </div>
  );
};

export default Seperator;
