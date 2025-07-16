import { useState, useEffect } from "react";
import Navbar from "../Common/Navbar";
import Menu from "../Common/Menu";
import Hero from "./Hero";


function History() {
  const [tasks, setTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  });

  useEffect(() => {
  async function loadTasks() {
    const username = localStorage.getItem('username');
    const res = await fetch(`https://taskmanager-cnw2.onrender.com/tasks?username=${username}`);
    const data = await res.json();
    setTasks(data.map(t => ({ ...t, id: t._id })));
  }
  loadTasks();
}, []);


  
  return (
    <div className="overflow-x-hidden flex flex-col gap-8">
       <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} currentDate={currentDate} setCurrentDate={setCurrentDate} tasks={tasks} />
      <div className="flex gap-5 justify-center 2xl:justify-start px-2 xl:px-0 sm:px-8">
        <Menu />
        <Hero searchQuery={searchQuery} currentDate={currentDate} tasks={tasks} setTasks={setTasks} />

      </div>
    </div>
  );
}

export default History;
