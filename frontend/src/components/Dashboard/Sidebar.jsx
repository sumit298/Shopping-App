import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { BsTagsFill } from "react-icons/bs";
import { GrSchedulePlay } from "react-icons/gr";
import { AiOutlineLeftCircle } from "react-icons/ai";
import { BiCalendarAlt } from "react-icons/bi";

const Sidebar = () => {
  return (
    <div className="h-screen p-8 w-1/4">
      <div className="bg-blue-500 flex flex-col justify-between w-full p-8 h-full rounded">
        <div>
          <span className="text-2xl text-white font-semibold">Board.</span>

          <div className="flex flex-col justify-between my-4">
            <ul className="flex flex-col gap-5 text-white">
              <li className="flex items-center  gap-3 cursor-pointer">
                <AiOutlineLeftCircle size={20} color="white" />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center  gap-3 cursor-pointer">
                <BsTagsFill size={20} color="white" />
                <span>Transactions</span>
              </li>
              <li className="flex items-center  gap-3 cursor-pointer">
                <BiCalendarAlt size={20} color="white" />
                <span>Schedules</span>
              </li>
              <li className="flex items-center  gap-3 cursor-pointer">
                <FaUserCircle size={20} color="white" />
                <span>Users</span>
              </li>
              <li className="flex items-center  gap-3 cursor-pointer">
                <IoSettingsSharp size={20} color="white" />
                <span>Settings</span>
              </li>
            </ul>
          </div>
        </div>
        <ul className="text-white text-sm flex flex-col gap-3">
          <li className="cursor-pointer">Help</li>
          <li className="cursor-pointer">Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
