import React, { useState, useRef, useEffect } from 'react';
import Red from '../../assets/Red.svg'
import edit from '../../assets/edit.svg'
import Statusimg from '../../assets/Statusimg.svg'
import greenDot from '../../assets/greenDot.svg'
import blueDot from '../../assets/blueDot.svg'
import redDot from '../../assets/redDot.svg'
import Create from '../Create/Create'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Hero({ searchQuery, currentDate, tasks, setTasks }) {
    const formatDate = (isoDate) => {
        if (!isoDate) return ""; // guard against undefined/null
      
        const [year, month, day] = isoDate.split("-");
        const dateObj = new Date(year, month - 1, day); // month is 0-indexed
      
        const options = { day: "numeric", month: "long" };
        return dateObj.toLocaleDateString("en-US", options);
      };
      
    const formattedDate = formatDate(currentDate);
   

    const addTask = (task) => {setTasks([...tasks, task])};

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

    const Completedtask = tasks
    .filter((task) => task.completed)
    .filter((task) => currentDate ? task.date === currentDate : true);

    const handleStatusChange = (id, newStatus) => {
        setTasks(prevTasks =>prevTasks.map(task =>task.id === id ? {...task, status: newStatus, completed: newStatus === 'Completed' ? true : false}: task));
    };

    const [CreateOpen, setCreateOpen]= useState('hidden')
    const AddPop = ()=>{setCreateOpen(CreateOpen==='hidden'?'flex':'hidden')}

    const [activeMenuId, setActiveMenuId] = useState(null);
    const toggleMenu = (id) => {setActiveMenuId(prev => (prev === id ? null : id))};

    const menuRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);

    const handleDelete = (id)=>{
        setTasks(tasks.filter((task)=>task.id !==id))
    }

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


      
  return (
    <div className=' flex flex-wrap 2xl:flex-nowrap gap-10 justify-center items-center w-8xl h-auto  rounded-2xl  px-1 py-4 2xl:mr-4 my-0 mb-4 '>
        <div className='flex flex-col gap-2 justify-start items-center w-[100%] lg:w-115 2xl:w-[25dvw] h-190 rounded-2xl py-2 shadow-2xl '>
            {/* top header of left section start */}
            <div className='flex flex-col gap-2 w-[95%] h-20 '>
                <div className='flex gap-10 justify-between items-center w-[100%] h-10'>
                    <div className=' w-25 h-10 flex items-center gap-2 [color:#FF6767] text-xl font-semibold'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "></polygon> <line fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"></line> <polyline fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "></polyline> <polygon fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 "></polygon> </g></svg>To-Do</div>
                    <button onClick={()=>{AddPop(), handleAddEdit('Add')}}  className=' w-25 h-10 flex justify-center items-center font-semibold text-gray-400 cursor-pointer'><svg width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#FF6767" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#FF6767" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg> Add Task</button>
                </div>
                <div className=' h-10 flex justify-start items-center'>{formattedDate}</div>
            </div>
            {/* top header of left section end */}

            {/* main content of left section start */}
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-full py-2 overflow-y-auto overflow-x-hidden'>
            {tasks.filter(task => !task.completed &&  task.title.toLowerCase().includes(searchQuery.toLowerCase())&&(currentDate ? task.date === currentDate : true)).map(task => (
                <div key={task.id} className='relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                    <div className=' w-[10%] flex items-start justify-center'><img src={Red}/></div>
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
                        <button onClick={()=>{handleStatusChange(task.id, 'Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                        <button onClick={()=>{handleStatusChange(task.id, 'Completed'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Completed</button>
                        <button onClick={()=>{handleStatusChange(task.id, 'Not Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Not Started</button>
                        <button onClick={()=>{setEditTask(task), AddPop(), handleAddEdit('Edit').setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                        <button onClick={()=>{handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                    </div>
                    )}
                </div>
            ))}
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
            <div className='flex justify-start items-center gap-2 w-[98%] h-10 [color:#FF6767] text-xl font-semibold'><img src={Statusimg}/>Completed Task</div>
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-[460px] py-2 overflow-y-auto overflow-x-hidden'>
            {Completedtask.map(task => (
                <div key={task.id} className='relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                <div className=' w-[10%] flex items-start justify-center'><img src={Red}/></div>
                <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                    <div className=' w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                    <div className='w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                    <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                        <div className='justify-center items-center h-8'>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' :'text-red-400'}>{task.status || 'Not Started'}</span></div>
                        <div className='justify-center items-center h-8 text-gray-400'>Created on:{task.date}</div>
                    </div>
                </div>
                <button onClick={() => toggleMenu(task.id)} className='w-[10%] flex justify-center items-start cursor-pointer'><img src={edit}/></button>
                {activeMenuId === task.id && (
                <div ref={menuRef} className='absolute top-8 right-9 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                   <button onClick={() => {handleStatusChange(task.id, 'Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                   <button onClick={()=>{handleStatusChange(task.id, 'Not Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Not Started</button>
                    <button onClick={() => {handleStatusChange(task.id, 'Completed'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Completed</button>
                    <button onClick={()=>{setEditTask(task), AddPop(), handleAddEdit('Edit'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                    <button onClick={()=>{handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                </div>
                )}
            </div>
            ))}
            </div>
        </div>
    {/* main content bottom section end */}
        </div>

    {/* main content of right section end */}
    <div  className='flex flex-col gap-2 justify-start items-center w-[100%] lg:w-110 2xl:w-[22dvw]  h-190 rounded-2xl py-2'>
         <div className='w-[100%] h-full shadow-2xl py-2 pb-2 px-2 rounded-2xl bord'>
            <div className=' flex justify-start items-center gap-2 w-[98%] h-10 [color:#FF6767] text-xl font-semibold mb-2'><img src={Statusimg}/>Task History</div>
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-[660px] py-2 overflow-y-auto overflow-x-hidden'>
           {tasks.filter(task => task.date < currentDate).sort((a, b) => new Date(b.date) - new Date(a.date)).map(task => (
                 <div key={task.id} className='relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                <div className=' w-[10%] flex items-start justify-center'><img src={Red}/></div>
                <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                    <div className=' w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                    <div className='w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                    <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                        <div className='justify-center items-center h-8 text-[14px] '>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' :'text-red-400'}>{task.status || 'Not Started'}</span></div>
                        <div className='justify-center items-center h-8 text-gray-400  text-[14px]'>Created on:{task.date}</div>
                    </div>
                </div>
                <button onClick={() => toggleMenu(task.id)} className='w-[10%] flex justify-center items-start cursor-pointer'><img src={edit}/></button>
                {activeMenuId === task.id && (
                <div ref={menuRef} className='absolute top-8 right-9 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                   <button onClick={() => {handleStatusChange(task.id, 'Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                   <button onClick={()=>{handleStatusChange(task.id, 'Not Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Not Started</button>
                    <button onClick={() => {handleStatusChange(task.id, 'Completed'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Completed</button>
                    <button onClick={()=>{setEditTask(task), AddPop(), handleAddEdit('Edit'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                    <button onClick={()=>{handleDelete(task.id)}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-b-xl cursor-pointer'>Delete</button>
                </div>
                )}
            </div>
            ))}
            </div>
        </div>
    </div>
    <Create currentDates={currentDate} toggle={CreateOpen} setToggle={setCreateOpen} addTask={addTask} AddEdit={addedittoggle}  editTask={editTask} setEditTask={setEditTask}  updateTask={updateTask} />
    </div>
  )
}

export default Hero
