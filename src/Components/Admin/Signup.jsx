import React, { useState } from 'react'
import background from '../../assets/background.png'
import signbanner from '../../assets/signbanner.png'

const [info, setInfo] = useState({name:'',username:'',email:'',password:''})

const handleChange = (e)=>{
  setInfo({...info, [e.target.name]: e.target.value})
}

function Signup() {
  return (
    <div className='relative w-screen h-screen'>
      <img className='relative  w-full h-full object-cover' src={background} alt="Background"/>
      <div className='absolute inset-0 bg-[#FF6767]/90 flex justify-center items-center z-10'>
      <div className=' bg-white w-6xl h-[700px] rounded-2xl flex justify-center items-center px-4 sm:px-8 mx-2 gap-1'>
        <div className='w-[100%] h-[90%] hidden md:flex justify-center items-center'><img src={signbanner}/></div>
        <div className='w-[100%] h-[90%] flex flex-col justify-start items-start gap-5'>
          <div className='text-2xl font-bold text-black'>Sign Up</div>
          <div className='w-full'><input onChange={handleChange} type='text' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your name' /></div>
          <div className='w-full'><input  type='text' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your username' /></div>
          <div className='w-full'><input  type='text' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your email' /></div>
          <div className='w-full'><input  type='text' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your password' /></div>
          <div className='w-full'><input  type='text' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='confirm your password' /></div>
          <button className='bg-[#FF6767] hover:bg-red-600 cursor-pointer text-white p-3 rounded-2xl'>Register</button>
          <div className='flex justify-center items-center gap-2'>Already have an account?<button className='text-blue-400 hover:text-blue-600 cursor-pointer'>Sign In</button></div>
          <div className='flex justify-center items-center gap-2'>Or, Login with <button>facebook</button><button>google</button><button>github</button><button>twitter</button></div>
        </div>
      </div>
      </div>
      
    </div>

  )
}

export default Signup
