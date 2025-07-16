import React, { useState, useEffect } from 'react';

function ForgotPassword({ fogtoggle, emailunchange, setFogtoggle }) {
  const [email, setEmail] = useState(emailunchange || '');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isLoggedIn = !!emailunchange;  // true if coming from logged in context

  useEffect(() => {
    let timer;
    if (otpCooldown > 0) {
      timer = setInterval(() => {
        setOtpCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpCooldown]);

  useEffect(() => {
    if (fogtoggle === 'flex') {
      resetForgotPasswordState();
    }
  }, [fogtoggle]);

  // Reset states when email changes (if not logged in)
  useEffect(() => {
    if (!isLoggedIn) {
      resetForgotPasswordState();
    }
  }, [email]);

  const sendOtp = async () => {
    try {
      // Check if email exists
      const checkRes = await fetch(`http://localhost:3003/checkUserExists?email=${email}`);
      const checkData = await checkRes.json();

      if (!checkData.exists) {
        setMessage('Email does not exist');
        return;
      }

      // Send OTP
      const res = await fetch('http://localhost:3003/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        setMessage('OTP sent successfully');
        setOtpCooldown(120);
      } else {
        setMessage('Failed to send OTP');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      setMessage('Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch('http://localhost:3003/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();
      if (data.success) {
        setOtpVerified(true);
        setMessage('OTP verified successfully');
      } else {
        setMessage('Incorrect OTP');
        setOtpVerified(false);
      }
    } catch (err) {
      console.error('Error verifying OTP:', err);
      setMessage('Error verifying OTP');
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://localhost:3003/resetPassword', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await res.json();
      if (data.success) {
        alert('Password reset successfully');
        setFogtoggle('hidden');
        resetForgotPasswordState();
      } else {
        alert('Failed to reset password');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      alert('Error resetting password');
    }
  };

  const resetForgotPasswordState = () => {
    setOtpSent(false);
    setOtp('');
    setOtpVerified(false);
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setPasswordError('');
    setOtpCooldown(0);
  };

  return (
    <div className={`${fogtoggle} absolute bg-black/70 border-2 w-screen h-screen justify-center items-center`}>
      <div className='border-2 bg-white rounded-2xl opacity-100 z-50 w-[50%] flex flex-col justify-start items-center p-4 gap-4'>
        <div className='w-full text-xl font-semibold flex justify-between'>
          Forgot Password? 
          <button
            className='cursor-pointer'
            onClick={() => { setFogtoggle('hidden'); resetForgotPasswordState(); }}
          >
            Cancel
          </button>
        </div>

        <div className='w-full flex justify-start items-center gap-5'>
          <input
            name='email'
            value={email || emailunchange}
            onChange={!isLoggedIn ? (e) => setEmail(e.target.value) : undefined}
            readOnly={isLoggedIn}
            type='text'
            placeholder='Enter your email'
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

        {message && (
          <div className={`w-full text-left ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </div>
        )}

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
