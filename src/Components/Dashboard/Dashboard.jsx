import { useState } from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Hero from "./Hero";


function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <div className="overflow-x-hidden flex flex-col gap-8">
       <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex gap-16 justify-center 2xl:justify-start px-2 xl:px-0 sm:px-8">
        <Menu />
        <Hero searchQuery={searchQuery} />
      </div>
    </div>
  );
}

export default Dashboard;
