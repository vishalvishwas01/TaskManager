import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enIN from "date-fns/locale/en-IN";
import { parseISO } from "date-fns";
import { FaCalendarAlt } from 'react-icons/fa';
import SideMenu from "./SideMenu";

import "../../index.css";

registerLocale("en-IN", enIN);


function Navbar({ searchQuery, setSearchQuery, currentDate, setCurrentDate, tasks }) {

  const taskDates = tasks
  .map(task => task.date)
  .filter(date => !!date && !isNaN(Date.parse(date)))  // ✅ check it's a valid date
  .map(date => parseISO(date));  // ✅ safely parse

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": taskDates,
    },
  ];

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full text-sm text-gray-700 bg-transparent flex items-center gap-2 cursor-pointer border-2 border-red-500 rounded-md px-3 py-2"
  >
    <FaCalendarAlt className="text-red-500" />
    <span>{value}</span>
  </div>
));

const [showMenu, setShowMenu] = useState(false);


  return (
    <div className='fixed z-50 w-full bg-amber-50 px-6 md:px-20 py-4 flex flex-wrap gap-4 md:gap-10 items-center shadow-xl justify-start 2xl:justify-start sm:justify-center'>
      <div className='hidden 2xl:block [color:#FF6767] font-semibold text-2xl md:text-3xl'>Task<span className='text-black ml-2'>Manager</span></div>
      <button onClick={() => setShowMenu(prev => !prev)} className='block 2xl:hidden [color:#FF6767] font-semibold text-2xl md:text-3xl p-0 rounded-md bg-transparent hover:bg-[#FF6767] group transition-colors duration-300'>
            <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-[#FF6767] group-hover:stroke-white transition-colors duration-300"
              >
                <path
                  d="M4 12H20M4 8H20M4 16H12"
                  strokeWidth="2"
                  strokeLinecap="round"
                          strokeLinejoin="round"
              />
            </svg>
      </button>
      <div className='flex-grow min-w-[200px] max-w-xl 2xl:ml-[200px] ml-0'>
        <input type='text'  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search title here' className='w-full h-10 px-4 rounded-2xl shadow-sm text-[16px] bg-white outline-none' />
      </div>
      <div className='min-w-[160px] flex-shrink-0 rounded-md px-2 py-1 flex items-center  '>
       <DatePicker
          selected={currentDate && !isNaN(Date.parse(currentDate)) ? new Date(currentDate) : null}
          onChange={(date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            setCurrentDate(`${year}-${month}-${day}`);
          }}
          dateFormat="yyyy-MM-dd"
          highlightDates={highlightWithRanges}
          locale="en-IN"
          className="w-full outline-none text-sm text-gray-700 bg-transparent placeholder:uppercase"
          customInput={<CustomInput />}/>
      </div>
      <div>
      <SideMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
      </div>
    </div>
  );
}

export default Navbar;
