import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'

function Create({toggle, setToggle, addTask}) {
    const ExitPop = () => {setToggle('hidden');};

    const [form, setForm]=useState({title:'',date:'',desc:''})
    const handleChange = (e)=>{setForm({...form,[e.target.name]:e.target.value})}

    const handleAdd = ()=>{
        const newTask = { ...form, id: uuidv4() };
        addTask(newTask);
        setForm({ title: '', date: '', desc: '' });
        ExitPop();
    }
      
  return (
    <div className={`inset-0 ${toggle} justify-center items-center w-screen h-full fixed [background-color:rgba(0,0,0,0.7)] z-40`}>
    <div className="px-4 md:px-4 flex flex-col justify-center items-center gap-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-3xl h-140 border-1 rounded-2xl bg-white opacity-100 z-50 shadow-lg">
      <div className='w-[100%] h-10 flex justify-between items-center px-2 text-xl font-semibold underline underline-offset-6 decoration-red-400 decoration-3'>Add New Task <button onClick={ExitPop} className='cursor-pointer underline underline-offset-6 decoration-black decoration-3'>Go Back</button></div>
      <div className='px-2 py-2 flex flex-col justify-start items-start gap-5 border-gray-400 w-[100%] h-auto'>
        <div className='w-[100%] h-auto flex flex-col justify-center items-start gap-2'>
            <div className='w-[90%] h-auto text-xl font-semibold'>Title</div>
            <input onChange={handleChange} value={form.title} type='text' name='title' id='title' className='border-2 border-gray-400 rounded-md px-2 py-2  w-[100%] md:w-[90%] h-auto text-2xl' placeholder='write title here'/>
        </div>
        <div className='w-[100%] h-auto flex flex-col justify-center items-start gap-2'>
            <div className='w-[90%] h-auto text-xl font-semibold'>Date</div>
            <input onChange={handleChange} value={form.date} type='date' name='date' id='date' className='border-2 border-gray-400 rounded-md px-2 py-1 w-[100%] md:w-[90%] h-auto text-xl text-gray-500'/>
        </div>
        <div className='w-[100%] h-auto flex flex-col justify-center items-start gap-2'>
            <div className='w-[90%] h-auto text-xl font-semibold'>Description</div>
            <textarea onChange={handleChange} value={form.desc} name='desc' id='desc' className='border-2 border-gray-400 rounded-md px-2 py-1 w-full md:w-[90%] text-2xl resize-none' placeholder='Write description here...'rows={4}></textarea>
        </div>
      </div>
      <div className='w-[100%] h-10 flex justify-start items-center px-2'><button onClick={handleAdd} className=' w-20 h-10 rounded-xl border-none [background-color:#FF6767] text-white text-xl cursor-pointer hover:[background-color:#fd2121] transition-all'>Done</button></div>
    </div>
    </div>
  )
}

export default Create