import React from "react";
import Navbar from "./Navbar";
import Menu from "./Menu";
import Hero from "./Hero";
// import Create from "../Create/Create";

function Dashboard() {
  return (
    <div className="overflow-x-hidden flex flex-col gap-8">
      <Navbar />
      <div className="flex gap-16 justify-center 2xl:justify-start px-2 xl:px-0 sm:px-8">
        <Menu />
        <Hero />
      </div>
      
      
    </div>
  );
}

export default Dashboard;
