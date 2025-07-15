import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { NavLink} from 'react-router-dom'
import background from '../../assets/background.png'
import signbanner from '../../assets/signbanner.png'


function Signup() {
const [info, setInfo] = useState({name:'',username:'',email:'',password:'', confirmPassword:''})
const [list, setList]=useState([])
const [searchlist, setSearchList]=useState([])
const [passerr, setPassError]=useState(false)
const [usererr, setUserError]=useState(false)
const [emailerr, setEmailError]=useState(false)
const handleChange = (e) => {
  const { name, value } = e.target
  const updatedInfo = { ...info, [name]: value }
  setInfo(updatedInfo)

  if (name === 'username') {
    const isUserExist = searchlist.some(user => user.username === value)
    setUserError(isUserExist)
  }

  if (name === 'password' || name === 'confirmPassword') {
    setPassError(updatedInfo.password !== updatedInfo.confirmPassword)
  }

   if (name === 'email') {
    const isEmailExist = searchlist.some(user => user.email === value)
    setEmailError(isEmailExist)
  }
}



const getData = async()=>{
  const res = await fetch(`http://localhost:3000/get`);
  const data = await res.json();
  setSearchList(data)
}

const UserSearch = ()=>{
  if(searchlist.username === info.username){
    setUserError(true)
  } else{
    setUserError(false)
  }
}
const EmailSearch = ()=>{
  if(searchlist.email === info.email){
    setEmailError(true)
  } else{
    setEmailError(false)
  }
}
useEffect(()=>{
  getData()
  UserSearch()
  EmailSearch()
},[])

const handleRegister = async () => {
  const isUserExist = searchlist.some(user => user.username === info.username)
  const isEmailExist = searchlist.some(user => user.email === info.email)
  if (isUserExist) {
    setUserError(true)
    return
  } else {
    setUserError(false)
  }

   if (isEmailExist) {
    setEmailError(true)
    return
  } else {
    setEmailError(false)
  }

  if (info.password !== info.confirmPassword) {
    setPassError(true)
    return
  } else {
    setPassError(false)
  }

  const newUser = { ...info, id: uuidv4() }
  setList([...list, newUser])
  console.log(newUser)
  
  await fetch('http://localhost:3000/Signup', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  })

  setInfo({ name: '', username: '', email: '', password: '', confirmPassword: '' })
  getData()
}


  return (
    <div className='relative w-screen h-screen'>
      <img className='relative  w-full h-full object-cover' src={background} alt="Background"/>
      <div className='absolute inset-0 bg-[#FF6767]/90 flex justify-center items-center z-10'>
      <div className=' bg-white w-6xl h-[700px] rounded-2xl flex justify-center items-center px-4 sm:px-8 mx-2 gap-1'>
        <div className='w-[100%] h-[90%] hidden md:flex justify-center items-center'><img src={signbanner}/></div>
        <div className='w-[100%] h-[90%] flex flex-col justify-start items-start gap-5'>
          <div className='text-2xl font-bold text-black'>Sign Up</div>
          <div className='w-full'><input onChange={handleChange} value={info.name} type='text' id='name' name='name' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your name' /></div>
          <div className='w-full'><input onChange={handleChange} value={info.username} type='text' id='username' name='username' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your username' /></div>
          {usererr === true && <div className='text-red-500'>Username already exist</div>}
          <div className='w-full'><input onChange={handleChange} value={info.email} type='text' id='email' name='email' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your email' /></div>
          {emailerr === true && <div className='text-red-500'>Email already exist</div>}
          <div className='w-full'><input onChange={handleChange} value={info.password} type='text' id='password' name='password' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='Enter your password' /></div>
          <div className='w-full'><input onChange={handleChange} value={info.confirmPassword} type='text' id='confirmPassword' name='confirmPassword' className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2' placeholder='confirm your password' /></div>
          {passerr === true && <div className='text-red-500'>password did not match</div>}
          <button onClick={handleRegister} disabled={usererr || emailerr || passerr} className={`bg-[#FF6767] hover:bg-red-600 cursor-pointer text-white p-3 rounded-2xl ${ usererr || emailerr || passerr ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>Register</button>
          <NavLink to="/login" className='flex justify-center items-center gap-2'>Already have an account?<button className='text-blue-400 hover:text-blue-600 cursor-pointer'>Sign In</button></NavLink>
          <div className='flex justify-center items-center gap-2'>Or, Login with <button>facebook</button><button>google</button><button>github</button><button>twitter</button></div>
        </div>
      </div>
      </div>
      
    </div>

  )
}

export default Signup
