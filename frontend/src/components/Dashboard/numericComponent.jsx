import React from "react";

const NumericComponent = ({ title, discountUnit, totalPrice, icon, color }) => {
  return (
    <div className="flex flex-col justify-center items-start  pl-4 pr-8 border-2 py-5 shadow-md rounded-2xl">
      {icon}
      <span className="font-light float-left text-xs">{title}</span>
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl">{totalPrice}</h2>
        <span
          className={`text-${color}-500 text-sm bg-${color}-100 rounded-lg p-1`}
        >
          {discountUnit}
        </span>
      </div>
    </div>
  );
};

export default NumericComponent;
