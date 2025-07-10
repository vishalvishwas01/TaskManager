import React from 'react';

function Navbar() {
  return (
    <div className='w-full bg-amber-50 px-6 md:px-20 py-4 flex flex-wrap gap-4 md:gap-10  items-center shadow-md justify-start 2xl:justify-start sm:justify-center'>
      <div className='hidden 2xl:block [color:#FF6767] font-semibold text-2xl md:text-3xl'>Dash<span className='text-black'>board</span></div>
      <div className='block 2xl:hidden [color:#FF6767] font-semibold text-2xl md:text-3xl'><svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FF6767"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M4 8H20M4 16H12" stroke="#FF6767" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div>
      <div className='flex-grow min-w-[200px] max-w-xl 2xl:ml-[200px] ml-0'><input type='text' placeholder='Search task here' className='w-full h-10 px-4 rounded-2xl shadow-sm text-sm bg-white outline-none'/></div>
      <div className='min-w-[160px] flex-shrink-0 border-2 border-red-500 rounded-md px-2 py-1 flex items-center'><input type='date' className='w-full outline-none text-sm text-gray-700 bg-transparent placeholder:uppercase'/></div>
    </div>
  );
}

export default Navbar;
