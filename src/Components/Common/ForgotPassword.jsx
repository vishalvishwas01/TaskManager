import React, { useState, useEffect } from 'react';

function ForgotPassword({ fogtoggle, emailunchange, setFogtoggle }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');


const [verified, setVerified] = useState(false);



  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  const sendOtp = async () => {
    const res = await fetch('http://localhost:3000/sendOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailunchange })
    });

    const data = await res.json();
    if (data.success) {
      setOtpSent(true);
      setMessage('OTP sent successfully');
      setOtpCooldown(120); // 2 minutes
    } else {
      setMessage('Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    const res = await fetch('http://localhost:3000/verifyOtp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailunchange, otp })
    });

    const data = await res.json();
    if (data.success) {
      setOtpVerified(true);
      setMessage('OTP verified successfully');
    } else {
      setMessage('Incorrect OTP');
      setOtpVerified(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const res = await fetch('http://localhost:3000/resetPassword', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailunchange, newPassword })
    });

    const data = await res.json();
    if (data.success) {
      alert('Password reset successfully');
      setFogtoggle('hidden');
      resetForgotPasswordState();
    } else {
      alert('Failed to reset password');
    }
  };

  const resetForgotPasswordState = () => {
  setOtpSent(false);
  setOtp('');
  setVerified(false);
  setNewPassword('');
  setConfirmPassword('');
  setMessage('');
};
useEffect(() => {
  if (fogtoggle === 'flex') {
    resetForgotPasswordState();
  }
}, [fogtoggle]);



  return (
    <div className={`${fogtoggle} absolute bg-black/70 border-2 w-screen h-screen justify-center items-center`}>
      <div className='border-2 bg-white rounded-2xl opacity-100 z-50 w-[50%] flex flex-col justify-start items-center p-4 gap-4'>
        <div className='w-full text-xl font-semibold flex justify-between'>
          Forgot Password ? 
          <button className='cursor-pointer' onClick={() => {setFogtoggle('hidden'),resetForgotPasswordState()}}>Cancel</button>
        </div>

        <div className='w-full flex justify-start items-center gap-5'>
          <input
            name='email'
            value={emailunchange}
            type='text'
            readOnly
            className='py-2 px-2 text-xl text-gray-500 border-2 rounded-2xl w-[70%]'
          />
          <button
            disabled={otpCooldown > 0}
            onClick={sendOtp}
            className={`p-2 rounded-2xl text-white ${otpCooldown > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-400 hover:bg-red-600'}`}
          >
            {otpCooldown > 0 ? `Send Again in ${otpCooldown}s` : 'Send OTP'}
          </button>
        </div>
        {message && <div className={`w-full text-left ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</div>}

        <div className='w-full flex justify-start items-center gap-5'>
          <input
            name='otp'
            type='number'
            placeholder='OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='py-2 px-2 text-xl border-2 border-gray-400 rounded-2xl'
          />
          <button
            onClick={verifyOtp}
            className='bg-green-400 p-2 rounded-2xl text-white cursor-pointer hover:bg-green-600'
          >
            Verify OTP
          </button>
        </div>

        {otpVerified && (
          <>
            <div className='w-full justify-start items-center px-2'>New Password</div>
            <input
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='border-1 border-gray-500 w-full rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'
            />

            <div className='w-full justify-start items-center px-2'>Confirm New Password</div>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='border-1 border-gray-500 w-full rounded-xl px-2 py-2 text-xl text-gray-500 hover:text-black'
            />
            {passwordError && <span className='text-red-500'>{passwordError}</span>}

            <button
              onClick={handleResetPassword}
              className='bg-blue-500 p-2 rounded-2xl text-white cursor-pointer hover:bg-blue-600 mt-2'
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
