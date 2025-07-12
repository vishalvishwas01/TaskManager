import React, { useState, useRef, useEffect } from 'react';
import Red from '../../assets/Red.svg'
import Create from '../Create/Create'
import Myedit from '../../assets/Myedit.svg'
import Mydelete from '../../assets/Mydelete.svg'
import 'react-circular-progressbar/dist/styles.css';

function Hero({ searchQuery, currentDate, tasks, setTasks }) {
    const [statusFilter, setStatusFilter] = useState('All');

    const [selectedTask, setSelectedTask] = useState(null);

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
        if (selectedTask?.id === id) {
                setSelectedTask(prev => ({
                ...prev,
                status: newStatus,
                completed: newStatus === 'Completed'
                }));
            }
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
         if (selectedTask?.id === id) {
            setSelectedTask(null);
        }
    }

    const [editTask, setEditTask] = useState(null);
    const updateTask = (updatedTask) => {
        const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        setTasks(updatedTasks);
         if (selectedTask?.id === updatedTask.id) {
                setSelectedTask(updatedTask);
        }
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
                    <div className=' w-30 h-10 flex items-center gap-2 [color:#FF6767] text-xl font-semibold'><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34px" height="34px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="55,1 55,54 59,62 63,54 63,1 "></polygon> <line fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" x1="55" y1="11" x2="63" y2="11"></line> <polyline fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="14,8 1,8 1,63 45,63 45,8 32,8 "></polyline> <polygon fill="none" stroke="#000000" stroke-width="0.968" stroke-miterlimit="10" points="27,5 27,1 19,1 19,5 15,5 13,13 33,13 31,5 "></polygon> </g></svg>My Task</div>
                    <button onClick={()=>{AddPop(), handleAddEdit('Add')}}  className=' w-25 h-10 flex justify-center items-center font-semibold text-gray-400 cursor-pointer'><svg width="34px" height="34px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g data-name="add" id="add-2"> <g> <line fill="none" stroke="#FF6767" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"></line> <line fill="none" stroke="#FF6767" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"></line> </g> </g> </g> </g></svg> Add Task</button>
                </div>
                <div className=' h-10 flex justify-start items-center'>{formattedDate}</div>
            </div>
            {/* top header of left section end */}

            {/* filter section start */}

            <div className='flex justify-center items-center gap-8 w-fullpx-2'>
                <button onClick={() => setStatusFilter('All')} className='bg-gray-300 hover:bg-gray-400 transition-all cursor-pointer py-1 px-2 rounded-md'>All</button>     
                <button onClick={() => setStatusFilter('Not Started')} className='bg-red-300 hover:bg-red-400 transition-all cursor-pointer py-1 px-2 rounded-md'>Not started</button>
                <button onClick={() => setStatusFilter('Started')} className='bg-blue-300  hover:bg-blue-400 transition-all cursor-pointer py-1 px-2 rounded-md'>Pending</button>
                <button onClick={() => setStatusFilter('Completed')} className='bg-green-300 hover:bg-green-400 transition-all cursor-pointer py-1 px-2 rounded-md'>Completed</button>
            </div>

            {/* filter section end */}

            {/* main content of left section start */}
            <div className='flex flex-col justify-start items-center gap-2 w-[100%] h-full py-2 overflow-y-auto overflow-x-hidden'>
            {tasks.filter(task =>   task.title.toLowerCase().includes(searchQuery.toLowerCase())&&(currentDate ? task.date === currentDate : true) && (statusFilter === 'All' || task.status === statusFilter || (!task.status && statusFilter === 'Not Started'))).map(task => (
                <button  key={task.id} onClick={() => setSelectedTask(task)} className='cursor-pointer relative flex gap-1 border-2 [border-color:#A1A3AB]  h-auto w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                    <div className=' w-[10%] flex items-start justify-center'><img src={Red}/></div>
                    <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                        <div className='flex justify-start w-[100%] h-auto text-xl font-semibold text-black break-words'>{task.title}</div>
                        <div className='flex justify-start w-[100%] h-auto text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words line-clamp-3'>{task.desc}</div>
                        <div className='flex flex-wrap gap-2 w-[100%] h-auto mt-2 justify-start items-center'>
                            <div className='justify-center items-center h-8'>Status: <span className={task.status === 'Completed' ? 'text-green-500' : task.status === 'Started' ? 'text-blue-500' : 'text-red-400'}>{task.status || 'Not Started'}</span></div>
                            <div className='justify-center items-center h-8 text-gray-400'>Created on: {task.date}</div>
                        </div>
                    </div>
                </button>
            ))}
            </div>
            {/* main content of left section end */}
        </div>



            {/* main content of right section start */}
        <div className='md:flex flex-col hidden justify-start items-center gap-4  w-[100%] lg:w-150 h-190 py-2 rounded-2xl'>
             {selectedTask ? (
                    <div className=' relative flex gap-1 border-2 [border-color:#A1A3AB]  h-full w-[92dvw] md:w-[89dvw] lg:w-[95%] rounded-2xl px-2  py-2'>
                    <div className='flex flex-col w-[90%] flex-grow min-w-0 gap-2'>
                        <div className=' w-[100%] h-auto text-xl font-semibold text-black break-words'>Title: {selectedTask.title}</div>
                        
                        <div className='flex flex-col flex-wrap w-[100%] h-auto mt-2 justify-center items-start'>
                            <div className='justify-center items-center h-8'>Status: <span className={selectedTask.status === 'Completed' ? 'text-green-500' : selectedTask.status === 'Started' ? 'text-blue-500' : 'text-red-400'}>{selectedTask.status || 'Not Started'}</span></div>
                            <div className='justify-center items-center h-8 text-gray-400'>Created on: {selectedTask.date}</div>
                        </div>
                        <div className=' w-[100%] h-full text-[16px] font-semibold text-gray-500 whitespace-pre-wrap break-words'><span className='text-black'>Description:</span> {selectedTask.desc}</div>
                        <div className='w-full flex gap-4'>
                        <button onClick={() => toggleMenu(selectedTask.id)} className='cursor-pointer w-auto h-auto'><img src={Myedit}/></button>
                        <button onClick={()=>{handleDelete(selectedTask.id)}} className='cursor-pointer w-auto h-auto'><img src={Mydelete}/></button>
                        </div>
                        {activeMenuId === selectedTask.id && (
                            <div ref={menuRef} className='absolute bottom-12 left-2 flex flex-col justify-center items-center w-30 h-auto gap-2 border border-gray-300 rounded-xl bg-white shadow-md z-10'>
                                <button onClick={()=>{handleStatusChange(selectedTask.id, 'Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all rounded-t-xl cursor-pointer'>Started</button>
                                <button onClick={()=>{handleStatusChange(selectedTask.id, 'Completed'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Completed</button>
                                <button onClick={()=>{handleStatusChange(selectedTask.id, 'Not Started'),setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer text'>Not Started</button>
                                <button onClick={()=>{setEditTask(selectedTask), AddPop(), handleAddEdit('Edit').setActiveMenuId(null);}} className='flex justify-start items-center w-full h-6 pl-4 hover:bg-[#FF6767] transition-all cursor-pointer'>Edit</button>
                            </div>
                            )}
                            </div>
                         <div className=' w-[10%] flex items-start justify-center'><img src={Red}/></div>
                    </div>
                ) : (
                    <p className='text-gray-400'>Click a task to see its details here.</p>
                )}
            
        </div>
        {/* main content of right section end */}

   
    <Create currentDates={currentDate} toggle={CreateOpen} setToggle={setCreateOpen} addTask={addTask} AddEdit={addedittoggle}  editTask={editTask} setEditTask={setEditTask}  updateTask={updateTask} />
    </div>
  )
}

export default Hero
