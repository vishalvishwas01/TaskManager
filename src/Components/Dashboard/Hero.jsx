import React, { useState, useRef, useEffect } from 'react';
import Red from '../../assets/Red.svg'
import blue from '../../assets/blue.svg'
import green from '../../assets/green.svg'
import edit from '../../assets/edit.svg'
import Statusimg from '../../assets/Statusimg.svg'
import greenDot from '../../assets/greenDot.svg'
import blueDot from '../../assets/blueDot.svg'
import redDot from '../../assets/redDot.svg'
import Create from '../Create/Create'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Hero({ searchQuery, currentDate, tasks, setTasks }) {

    const [del, setDel] = useState('hidden')
        const popupRef = useRef(null);
    

    const formatDate = (isoDate) => {
        if (!isoDate) return ""; // guard against undefined/null
      
        const [year, month, day] = isoDate.split("-");
        const dateObj = new Date(year, month - 1, day); // month is 0-indexed
      
        const options = { day: "numeric", month: "long" };
        return dateObj.toLocaleDateString("en-US", options);
      };
      
    const formattedDate = formatDate(currentDate);
   

    const addTask = (task) => {setTasks(prev => [...prev, { ...task, id: task._id }])};

    const [addedittoggle, setAddEditToggle]=useState('Add New Task')
    const handleAddEdit = (mode) => {
        if (mode === 'Add') {
          setAddEditToggle('Add New Task');
        } else if (mode === 'Edit') {
          setAddEditToggle('Edit Task');
        } else {
          setAddEditToggle('Unknown');
        }
      };

    // const Completedtask = tasks.filter(task => task.status === "Completed")
    // .filter((task) => currentDate ? task.date === currentDate : true);
    const Completedtask = tasks
    .filter(task => task.status === 'Completed' &&
        (currentDate ? task.date === currentDate : true)
    );


   const handleStatusChange = async (taskId, newStatus) => {
  const username = localStorage.getItem("username");
  try {
    const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, status: newStatus })
    });

    if (res.ok) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } else {
      console.error("Failed to update status");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};




    const [CreateOpen, setCreateOpen]= useState('hidden')
    const AddPop = ()=>{setCreateOpen(CreateOpen==='hidden'?'flex':'hidden')}

    const [activeMenuId, setActiveMenuId] = useState(null);
    const toggleMenu = (id) => {setActiveMenuId(prev => (prev === id ? null : id))};

    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          // Close dropdown menu if clicked outside
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setActiveMenuId(null);
          }
      
          // Close 'Clear All' popup if clicked outside
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setDel('hidden');
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
   

   const handleDelete = async (id) => {
  const username = localStorage.getItem("username");
  try {
    await fetch(`http://localhost:3000/tasks/${id}?username=${username}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter(task => task._id !== id));
  } catch (err) {
    console.error("Failed to delete task", err);
  }
};



    const [editTask, setEditTask] = useState(null);
    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        setTasks(updatedTasks);
      };
      
      const totalTasks = tasks.length;
        const notStartedCount = tasks.filter(task => task.status === 'Not Started' || !task.status).length;
        const startedCount = tasks.filter(task => task.status === 'Started').length;
        const completedCount = tasks.filter(task => task.status === 'Completed').length;

        const getPercentage = (count) => totalTasks === 0 ? 0 : Math.round((count / totalTasks) * 100);

        const Notpercentage = getPercentage(notStartedCount);
        const Progresspercentage = getPercentage(startedCount);
        const Completedpercentage = getPercentage(completedCount);

        
        // const TodoTasks = tasks
        // .filter((task) => task.status === 'Not Started' || task.status === 'Started' || task.status === '');
        const TodoTasks = tasks
        .filter(task => (task.status === 'Not Started' || task.status === 'Started' || !task.status) &&
            (currentDate ? task.date === currentDate : true) &&
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );


            const getCircleIcon = (status) => {
            if (status === 'Completed') return green;
            if (status === 'Started') return blue;
            return Red;
        };

        const handleClearCompleted = async () => {
  const username = localStorage.getItem("username");
  try {
    const res = await fetch(`http://localhost:3000/tasks/clear/completed/${currentDate}?username=${username}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setTasks(prev => prev.filter(task => !(task.status === "Completed" && task.date === currentDate)));
    } else {
      console.error("Failed to delete completed tasks.");
    }
  } catch (err) {
    console.error("Error clearing completed tasks:", err);
  }
};


            const TaskHistory = tasks
  .filter(task => task.date < currentDate)
  .sort((a, b) => new Date(b.date) - new Date(a.date));





      
  return (
    <div className=' flex flex-wrap 2xl:flex-nowrap gap-10 justify-center items-center w-8xl h-auto  rounded-2xl  px-1 py-4 2xl:mr-4 my-0'>
        <div className='flex flex-col gap-2 justify-start items-center w-[100%] lg:w-115 2xl:w-[25dvw] h-190 rounded-2xl py-2 shadow-2xl '>
            {/* top header of left section start */}
            <div className='flex flex-col gap-2 w-[95%] h-20 '>
                <div className='flex gap-10 justify-between items-center w-[100%] h-10'>
                    <div className=' w-25 h-10 flex items-center gap-2 [color:#FF6767] text-xl font-semibold'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill="none" stroke="#000000" strokeWidth="0.968" strokeMiterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "></polygon> <line fill="none" stroke="#000000" strokeWidth="0.968" strokeMiterlimit="10" x1="55" y1="11" x2="63" y2="11"></line> <polyline fill="none" stroke="#000000" strokeWidth="0.968" strokeMiterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "></polyline> <polygon fill="none" stroke="#000000" strokeWidth="0.968" strokeMiterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 "></polygon> </g></svg>To-Do</div>
                    <button onClick={()=>{AddPop(), handleAddEdit('Add')}}  className=' w-25 h-10 flex justify-center items-center font-semibold text-gray-400 cursor-pointer'><svg width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#FF6767" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#FF6767" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg> Add Task</button>
                </div>
                <div className=' h-10 flex justify-start items-center'>{formattedDate}</div>
            </div>
            {/* top header of left section end */}

            {/* main content of left section start */}
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-full py-2 overflow-y-auto overflow-x-hidden'>
            {TodoTasks.length === 0 ? (
                <button onClick={()=>{AddPop(), handleAddEdit('Add')}} className='text-gray-500 text-xl font-semibold cursor-pointer border-2 h-[70%] w-[70%] border-dashed'>Add some tasks first</button>
            ) : (
                TodoTasks.map(task => (
                <div key={task._id} className='relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                    <div className={`w-[10%] flex items-start justify-center`}><img src={getCircleIcon(task.status)}/></div>
                    <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                    <div className=' w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                    <div className='w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                    <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                        <div className='justify-center items-center h-8'>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' : 'text-red-400'}>{task.status || 'Not Started'}</span></div>
                        <div className='justify-center items-center h-8 text-gray-400'>Created on: {task.date}</div>
                    </div>
                    </div>
                    <button onClick={() => toggleMenu(task.id)} className='w-[10%] flex justify-center items-start cursor-pointer'><img src={edit}/></button>
                    {activeMenuId === task.id && (
                    <div ref={menuRef} className='absolute top-8 right-9 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                        <button onClick={()=>{handleStatusChange(task.id, 'Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                        <button onClick={()=>{handleStatusChange(task.id, 'Completed'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Completed</button>
                        <button onClick={()=>{handleStatusChange(task.id, 'Not Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Not Started</button>
                        <button onClick={()=>{setEditTask(task); AddPop(); handleAddEdit('Edit'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                        <button onClick={()=>{handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                    </div>
                    )}
                </div>
                ))
            )}
            </div>

            {/* main content of left section end */}
        </div>



    {/* main content of right section start */}
        <div className='flex flex-col justify-start items-center gap-4  w-[100%] lg:w-115 h-190 rounded-2xl'>
    {/* main content top section section start */}
            <div className='flex flex-col justify-start items-center gap-5 shadow-2xl w-[100%] h-auto rounded-2xl py-2 pb-4 px-4'>
                <div className='flex justify-start items-center gap-2 w-[98%] h-10 [color:#FF6767] text-xl font-semibold'><img src={Statusimg}/>Task Status</div>
                <div className='flex justify-center items-center gap-3 w-[98%] h-35 '>
                    <div className='flex flex-col justify-start items-center h-full w-full sm:w-[45%] lg:w-[30%]'>
                        <div className='w-[100px] h-[80%]'><CircularProgressbar styles={buildStyles({pathColor: `rgba(0, 184, 21, ${Completedpercentage / 100})`,strokeLinecap: 'butt'})} strokeWidth={12} counterClockwise={true} value={Completedpercentage} text={`${Completedpercentage}%`} /></div>
                        <div className='flex justify-center lg:justify-start items-center w-[100%] h-[20%] font-semibold'><img src={greenDot}/>Completed</div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 h-full w-full sm:w-[45%] lg:w-[30%]'>
                        <div className='w-[100px] h-[80%]'><CircularProgressbar styles={buildStyles({pathColor: `rgba(3, 0, 184, ${Progresspercentage / 100})`,strokeLinecap: 'butt'})} strokeWidth={12} counterClockwise={true} value={Progresspercentage} text={`${Progresspercentage}%`} /></div>
                        <div className='flex justify-center lg:justify-start  items-center w-[100%] h-[20%] font-semibold'><img src={blueDot} />In Progress</div>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 h-full w-full sm:w-[45%] lg:w-[30%]'>
                        <div className='w-[100px] h-[80%]'><CircularProgressbar styles={buildStyles({pathColor: `rgba(220, 0, 0, ${Notpercentage / 100})`,strokeLinecap: 'butt'})} strokeWidth={12} counterClockwise={true} value={Notpercentage} text={`${Notpercentage}%`} /></div>
                        <div className='flex justify-center lg:justify-start  items-center w-[100%] h-[20%] font-semibold'><img src={redDot}/>Not Started</div>
                    </div>
                </div>
            </div>
            {/* main content top section section end */}
            
            {/* main content bottom section end */}
            <div className='w-[100%] h-full rounded-2xl shadow-2xl py-2 pb-2 px-2'>
            <div className='relative flex justify-between items-center gap-2 w-[98%] h-10 [color:#FF6767] text-xl font-semibold'><div className=' w-[200px] flex justify-center items-center gap-1'><img src={Statusimg}/>Completed Task</div> 
            <button onClick={()=>{setDel('flex')}} className='cursor-pointer flex justify-end mr-2 text-gray-400 w-[55%]'>Clear All</button>
            <div ref={popupRef} className={`${del} border-2 absolute w-50 top-8 right-10 flex-col justify-center items-center gap-4 px-4 py-2 rounded-xl bg-amber-100 z-10 opacity-100`}>
                      <div className='text-2xl text-gray-500'>Are you sure ?</div>
                      <div className='flex justify-center items-center gap-5'>
                      <button onClick={()=>{setDel('hidden')}} className={`${del} text-xl rounded-xl px-2 py-1 bg-green-300 text-black`}>cancel</button>
                      <button onClick={()=>{handleClearCompleted(), setDel('hidden')}} className=' text-xl text-black rounded-xl px-2 py-1 bg-red-300 font-semibold cursor-pointer'>Yes</button>
                      </div>
                    </div>
            </div>
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-[460px] py-2 overflow-y-auto overflow-x-hidden'>
            {Completedtask.length === 0 ? (
                <div className='text-gray-500 text-xl font-semibold border-2 h-[70%] w-[80%] border-dashed flex justify-center items-center mt-10'>Complete some tasks first</div>
            ) : (
                Completedtask.map(task => (
                <div key={task.id} className='relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                    <div className=' w-[10%] flex items-start justify-center'><img src={getCircleIcon(task.status)} /></div>
                    <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                    <div className=' w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                    <div className='w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                    <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                        <div className='justify-center items-center h-8'>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' :'text-red-400'}>{task.status || 'Not Started'}</span></div>
                        <div className='justify-center items-center h-8 text-gray-400'>Created on:{task.date}</div>
                    </div>
                    </div>
                    <button onClick={() => toggleMenu(task.id)} className='w-[10%] flex justify-center items-start cursor-pointer'><img src={edit} /></button>
                    {activeMenuId === task.id && (
                    <div ref={menuRef} className='absolute top-8 right-9 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                        <button onClick={() => {handleStatusChange(task.id, 'Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                        <button onClick={() => {handleStatusChange(task.id, 'Not Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Not Started</button>
                        <button onClick={() => {handleStatusChange(task.id, 'Completed'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Completed</button>
                        <button onClick={() => {setEditTask(task); AddPop(); handleAddEdit('Edit'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                        <button onClick={() => {handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                    </div>
                    )}
                </div>
                ))
            )}
            </div>
        </div>
    {/* main content bottom section end */}
        </div>

    {/* main content of right section end */}
    <div  className='flex flex-col gap-2 justify-start items-center w-[100%] lg:w-110 2xl:w-[22dvw]  h-190 rounded-2xl py-2'>
         <div className='w-[100%] h-full shadow-2xl py-2 pb-2 px-2 rounded-2xl bord'>
            <div className=' flex justify-start items-center gap-2 w-[98%] h-10 [color:#FF6767] text-xl font-semibold mb-2'><img src={Statusimg}/>Task History</div>
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-[660px] py-2 overflow-y-auto overflow-x-hidden'>
            {tasks.filter(task => task.date < currentDate).length === 0 ? (
                <div className='text-gray-500 text-xl font-semibold'>No task history</div>
            ) : (
                tasks
                .filter(task => task.date < currentDate)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(task => (
                    <div key={task.id} className='relative flex gap-1 border-2 [border-color:#A1A3AB] h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2 py-2'>
                    <div className='w-[10%] flex items-start justify-center'><img src={getCircleIcon(task.status)} /></div>
                    <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                        <div className='w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                        <div className='w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                        <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                        <div className='justify-center items-center h-8 text-[14px]'>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' : 'text-red-400'}>{task.status || 'Not Started'}</span></div>
                        <div className='justify-center items-center h-8 text-gray-400 text-[14px]'>Created on: {task.date}</div>
                        </div>
                    </div>
                    <button onClick={() => toggleMenu(task.id)} className='w-[10%] flex justify-center items-start cursor-pointer'><img src={edit} /></button>
                    {activeMenuId === task.id && (
                        <div ref={menuRef} className='absolute top-8 right-9 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                        <button onClick={() => {handleStatusChange(task.id, 'Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                        <button onClick={() => {handleStatusChange(task.id, 'Not Started'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Not Started</button>
                        <button onClick={() => {handleStatusChange(task.id, 'Completed'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Completed</button>
                        <button onClick={() => {setEditTask(task); AddPop(); handleAddEdit('Edit'); setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                        <button onClick={() => {handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                        </div>
                    )}
                    </div>
                ))
            )}
            </div>

        </div>
    </div>
    <Create currentDates={currentDate} toggle={CreateOpen} setToggle={setCreateOpen} addTask={addTask} AddEdit={addedittoggle}  editTask={editTask} setEditTask={setEditTask}  updateTask={updateTask} />
    </div>
  )
}

export default Hero
