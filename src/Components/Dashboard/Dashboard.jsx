import { useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Hero from "./Hero";


function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });
  return (
    <div className="overflow-x-hidden flex flex-col gap-8">
       <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <div className="flex gap-5 justify-center 2xl:justify-start px-2 xl:px-0 sm:px-8">
        <Menu />
        <Hero searchQuery={searchQuery} currentDate={currentDate} />
      </div>
    </div>
  );
}

export default Dashboard;
