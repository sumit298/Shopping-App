import React from "react";
import Sidebar from "./Sidebar";
import ProductList from "./ProductList";
import NumericComponent from "./numericComponent";
import { FaRegUserCircle } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiFillDollarCircle } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="flex flex-col gap-2  w-4/5 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="search"
              name=""
              className="px-3 border-2 py-1.5 rounded-md"
              id=""
            />
            <h2 className="cursor-pointer">
              <FaRegUserCircle size={30} />
            </h2>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <NumericComponent
            title={"Total Revenues"}
            totalPrice={"$2,129,430"}
            discountUnit={"+2.5%"}
            icon={<BiMoney size={30} color="green" className="rounded" />}
            color="green"
          />
          <NumericComponent
            title="Total Sales"
            icon={
              <AiFillDollarCircle size={30} color="green" className="rounded" />
            }
          />
          <NumericComponent />
          <NumericComponent />
        </div>
      </div>

      <ProductList/>
    </div>
  );
};

export default Dashboard;
