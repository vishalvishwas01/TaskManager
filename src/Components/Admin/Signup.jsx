import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {NavLink , useNavigate} from 'react-router-dom';
import background from '../../assets/background.png';
import signbanner from '../../assets/signbanner.png';



function Signup() {
  const [info, setInfo] = useState({ name: '', username: '', email: '', password: '', confirmPassword: '' });
  const [list, setList] = useState([]);
  const [searchlist, setSearchList] = useState([]);
  const [passerr, setPassError] = useState(false);
  const [usererr, setUserError] = useState(false);
  const [emailerr, setEmailError] = useState('');
  const [nameerr, setNameError] = useState(false);
  

  const [isRegistering, setIsRegistering] = useState(false);



  const [passLengthErr, setPassLengthErr] = useState(false);
    const navigate = useNavigate();

const handleChange = (e) => {
  const { name, value } = e.target;
  const updatedInfo = { ...info, [name]: value };
  setInfo(updatedInfo);

  if (name === 'name') {
    setNameError(value.trim() === '');
  }

  if (name === 'username') {
    const isUserExist = searchlist.some(user => user.username === value);
    setUserError(isUserExist);
  }

  if (name === 'password') {
    setPassError(updatedInfo.password !== updatedInfo.confirmPassword);
    setPassLengthErr(value.length <= 6);
  }

  if (name === 'confirmPassword') {
    setPassError(updatedInfo.password !== updatedInfo.confirmPassword);
  }

  if (name === 'email') {
  const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailExist = searchlist.some(user => user.email === value);
  
  if (!emailFormat.test(value)) {
    setEmailError('Invalid email format');
  } else if (isEmailExist) {
    setEmailError('Email already exists');
  } else {
    setEmailError('');
  }
}

};


  const getData = async () => {
    const res = await fetch(`https://taskmanager-cnw2.onrender.com/get`);
    const data = await res.json();
    setSearchList(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleRegister = async () => {
  if (info.name.trim() === '') {
    setNameError(true);
    return;
  } else {
    setNameError(false);
  }

  const isUserExist = searchlist.some(user => user.username === info.username);
  const isEmailExist = searchlist.some(user => user.email === info.email);
  if (isUserExist) {
    setUserError(true);
    return;
  }

  if (isEmailExist) {
    setEmailError(true);
    return;
  }

  if (info.password !== info.confirmPassword) {
    setPassError(true);
    return;
  }

  try {
    setIsRegistering(true);  // start loading
    const newUser = { ...info, id: uuidv4() };
    setList([...list, newUser]);

    await fetch('https://taskmanager-cnw2.onrender.com/Signup', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    setInfo({ name: '', username: '', email: '', password: '', confirmPassword: '' });
    getData();
    navigate('/login');
  } catch (error) {
    console.error("Registration failed:", error);
  } finally {
    setIsRegistering(false);  // stop loading
  }
};


  const isRegisterDisabled = usererr || emailerr || passerr || nameerr || passLengthErr || Object.values(info).some(val => val.trim() === '');


  return (
    <div className='relative w-screen h-screen'>
      <img className='relative w-full h-full object-cover' src={background} alt="Background" />
      <div className='absolute inset-0 bg-[#FF6767]/90 flex justify-center items-center z-10'>
        <div className='bg-white w-6xl h-[700px] rounded-2xl flex justify-center items-center px-4 sm:px-8 mx-2 gap-1'>
          <div className='w-[100%] h-[90%] hidden md:flex justify-center items-center'><img src={signbanner} alt='Sign banner' /></div>
          <div className='w-[100%] h-[90%] flex flex-col justify-start items-start gap-5'>
            <div className='text-2xl font-bold text-black'>Sign Up</div>

            <div className='w-full'>
              <input
                onChange={handleChange}
                value={info.name}
                type='text'
                id='name'
                name='name'
                className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2'
                placeholder='Enter your name'
              />
              {nameerr && <div className='text-red-500'>Name is required</div>}
            </div>

            <div className='w-full'>
              <input
                onChange={handleChange}
                value={info.username}
                type='text'
                id='username'
                name='username'
                className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2'
                placeholder='Enter your username'
              />
              {usererr && <div className='text-red-500'>Username already exists</div>}
            </div>

            <div className='w-full'>
              <input
                onChange={handleChange}
                value={info.email}
                type='text'
                id='email'
                name='email'
                className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2'
                placeholder='Enter your email'
              />
              {emailerr && <div className='text-red-500'>{emailerr}</div>}

            </div>

            <div className='w-full'>
              <input
                onChange={handleChange}
                value={info.password}
                type='password'
                id='password'
                name='password'
                className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2'
                placeholder='Enter your password'
              />
              {passLengthErr && <div className='text-red-500'>Password must be more than 6 characters</div>}
            </div>

            <div className='w-full'>
              <input
                onChange={handleChange}
                value={info.confirmPassword}
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                className='border-2 border-gray-400 w-[100%] sm:w-[90%] py-2 rounded-xl px-2'
                placeholder='Confirm your password'
              />
              {passerr && <div className='text-red-500'>Password did not match</div>}
            </div>

            <button
              onClick={handleRegister}
              disabled={isRegisterDisabled || isRegistering}
              className={`bg-[#FF6767] hover:bg-red-600 text-white p-3 rounded-2xl ${isRegisterDisabled || isRegistering ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
               {isRegistering ? 'Registering...' : 'Register'}
            </button>

            <NavLink to="/login" className='flex justify-center items-center gap-2'>
              Already have an account?
              <button className='text-blue-400 hover:text-blue-600 cursor-pointer'>Sign In</button>
            </NavLink>


          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
