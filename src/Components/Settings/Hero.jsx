import React, { useState, useEffect } from 'react';
import ForgotPassword from '../Common/ForgotPassword';

function Hero() {

  const [loading, setLoading] = useState(true);

  const [userInfo, setUserInfo] = useState({
    name: '',
    username: '',
    email: ''
  });

  const [errors, setErrors] = useState({
  username: '',
  email: ''
});

const [passwordLengthErr, setPasswordLengthErr] = useState(false);



const currentUsername = localStorage.getItem('username');




  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      fetchUserData(username);
    }
  }, []);

  const fetchUserData = async (username) => {
  try {
    setLoading(true);
    const res = await fetch(`https://taskmanager-cnw2.onrender.com/getUser?username=${username}`);
    const data = await res.json();
    setUserInfo({
      name: data.name || '',
      username: data.username || '',
      email: data.email || ''
    });
  } catch (error) {
    console.error('Error fetching user info:', error);
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = async () => {
  try {
    // Check username existence
    const usernameCheck = await fetch(`https://taskmanager-cnw2.onrender.com/checkUserExists?username=${userInfo.username}&currentUsername=${currentUsername}`);

    const usernameData = await usernameCheck.json();

    // Check email existence
    const emailCheck = await fetch(`https://taskmanager-cnw2.onrender.com/checkUserExists?email=${userInfo.email}&currentUsername=${currentUsername}`);
    const emailData = await emailCheck.json();

    // Prepare error state
    const newErrors = {};
    if (usernameData.exists) {
      newErrors.username = 'Username already exists';
    }
    if (emailData.exists) {
      newErrors.email = 'Email already exists';
    }

    setErrors(newErrors);

    // If any errors, stop update
    if (usernameData.exists || emailData.exists) {
      return;
    }

    // Proceed to update
    const res = await fetch(`https://taskmanager-cnw2.onrender.com/updateUser`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentUsername,
        ...userInfo
      })
    });

    if (res.ok) {
      if (currentUsername !== userInfo.username) {
        localStorage.setItem('username', userInfo.username);
      }
      alert('User info updated successfully');
    } else {
      alert('Failed to update user info');
    }
  } catch (err) {
    console.error('Error saving changes:', err);
  }
};

const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const [passwordErrors, setPasswordErrors] = useState({
  oldPassword: '',
  confirmPassword: ''
});

// Live check: new and confirm password match
useEffect(() => {
  if (confirmPassword && newPassword !== confirmPassword) {
    setPasswordErrors((prev) => ({
      ...prev,
      confirmPassword: 'Passwords do not match'
    }));
  } else {
    setPasswordErrors((prev) => ({
      ...prev,
      confirmPassword: ''
    }));
  }
}, [newPassword, confirmPassword]);

const handlePasswordChange = async () => {
  try {
    // Verify old password
    const res = await fetch('https://taskmanager-cnw2.onrender.com/verifyPassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUsername,
        oldPassword
      })
    });

    const data = await res.json();

    if (!res.ok || !data.valid) {
      setPasswordErrors((prev) => ({
        ...prev,
        oldPassword: 'Old password did not match'
      }));
      return;
    }

    // Check new/confirm password
    if (newPassword !== confirmPassword) {
      setPasswordErrors((prev) => ({
        ...prev,
        confirmPassword: 'Passwords do not match'
      }));
      return;
    }

    // Proceed to update password
    const updateRes = await fetch('https://taskmanager-cnw2.onrender.com/updatePassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: currentUsername,
        newPassword
      })
    });

    if (updateRes.ok) {
      alert('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
    } else {
      alert('Failed to update password');
    }

  } catch (err) {
    console.error('Error updating password:', err);
  }
};

const [fog, setFog]=useState('hidden')

const handlefogtoggle = ()=>{
  setFog('flex')
}




  return (
    <div className='relative rounded-2xl shadow-2xl w-6xl h-[750px] flex flex-col justify-start items-center gap-5 p-4 overflow-x-hidden'>
      {/* Account information */}
      <div className='w-full h-auto flex flex-col justify-start items-center p-2 gap-5'>
        <div className=' w-full flex flex-col justify-start items-center gap-5 px-4'>
          <div className='w-full flex justify-start items-center text-2xl font-semibold decoration-red-400 decoration-1 underline-offset-1' >Account Information</div>
        </div>

        <div className='border-2 border-gray-500 rounded-2xl w-full flex flex-col justify-start items-center gap-2 py-4 px-4'>
          <label className='w-full justify-start items-center px-2'>Name</label>
          <input name="name" onChange={handleChange} disabled={loading} value={loading ? 'Fetching...' : userInfo.name} className='border-1 border-gray-500 w-full justify-start items-center rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'/>

           <div className='w-full justify-start items-center px-2'>Username</div>
          <input name="username" disabled={loading} value={loading ? 'Fetching...' : userInfo.username} onChange={handleChange} className='border-1 border-gray-500 w-full justify-start items-center rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black' />
          {errors.username && <span className="text-red-500">{errors.username}</span>}

           <div  className='w-full justify-start items-center px-2'>Email</div>
          <input name="email" onChange={handleChange} value={loading ? 'Fetching...' : userInfo.email} className='border-1 border-gray-500 w-full justify-start items-center rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black' />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>

        <div  onClick={handleSaveChanges}  className='w-full flex justify-start items-center px-4'><button className={`[background-color:#FF6767] hover:bg-red-600 cursor-pointer py-2 px-3 rounded-2xl text-white`} >Save Changes</button></div>
      </div>

      <div className='w-full h-auto flex flex-col justify-start items-center p-2 gap-5 '>
        <div className='w-full flex justify-start items-center text-2xl px-4 font-semibold decoration-red-400 decoration-1 underline-offset-1'>Change Password</div>
        
        <div className='border-2 border-gray-500 rounded-2xl w-full flex flex-col justify-start items-center gap-2 py-4 px-4'>
          <div className='w-full justify-start items-center px-2'>Old Password</div>
          <input
            type='password'
            value={oldPassword}
            autoComplete="off"
            onChange={(e) => setOldPassword(e.target.value)}
            className='border-1 border-gray-500 w-full rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'
          />
          {passwordErrors.oldPassword && <span className="text-red-500">{passwordErrors.oldPassword}</span>}

          <div className='w-full justify-start items-center px-2'>New Password</div>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => {
              const value = e.target.value;
              setNewPassword(value);
              setPasswordLengthErr(value.length > 0 && value.length <= 6);
            }}
            className='border-1 border-gray-500 w-full rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'
          />
          {passwordLengthErr && <span className="text-red-500">Password must be more than 6 characters</span>}


          <div className='w-full justify-start items-center px-2'>Confirm New Password</div>
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border-1 border-gray-500 w-full rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'
          />
          {passwordErrors.confirmPassword && <span className="text-red-500">{passwordErrors.confirmPassword}</span>}
        </div>

        <div className='w-full flex justify-start items-center gap-5 px-4'>
          <button onClick={handlePasswordChange} disabled={passwordLengthErr} className={`[background-color:#FF6767] hover:bg-red-600 cursor-pointer py-2 px-3 rounded-2xl text-white ${passwordLengthErr ? 'opacity-50 cursor-not-allowed' : ''}`}>Save Password</button>
          <button onClickCapture={handlefogtoggle} className='[background-color:#AB6767] hover:bg-red-600 cursor-pointer py-2 px-3 rounded-2xl text-white'>Forgot password ?</button>
        </div>
      </div>

      <ForgotPassword fogtoggle={fog} setFogtoggle={setFog}  emailunchange={userInfo.email} />

      
    </div>
  )
}

export default Hero
