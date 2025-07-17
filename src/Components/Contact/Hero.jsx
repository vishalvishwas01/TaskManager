import React, { useState } from 'react';

function Hero() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [status, setStatus] = useState('');  // Success or error message
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    setIsSending(true);
    setStatus('');

    try {
      const res = await fetch('http://localhost:3003/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const data = await res.json();

      if (data.success) {
        setStatus('Message sent successfully!');
        // Clear inputs
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error occurred while sending message.');
    } finally {
      setIsSending(false);
    }
  };

  const isDisabled = !name || !email || !message || isSending || !!emailError;

  const [emailError, setEmailError] = useState('');
  const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('vishalvishwas7082@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };



  return (
    <div className='mt-40 sm:mt-25  w-full md:w-[80%] h-auto sm:h-130 rounded-2xl shadow-2xl flex flex-col justify-start items-center gap-5 p-4'>
      <div className='w-full  flex flex-col justify-start items-center gap-4'>
        <div className='text-2xl font-semibold w-full'>Contact Me</div>
        <div className='w-full flex flex-wrap justify-start items-center gap-5'>
          <input
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='text-xl border-2 border-gray-400 rounded-xl px-2 py-1'
          />
          <input
            placeholder='Email'
            value={email}
            onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                setEmailError(validateEmail(value) ? '' : 'Invalid email address');
            }}
            className='text-xl border-2 border-gray-400 rounded-xl px-2 py-1'
            />
            {emailError && (
            <div className='text-red-500 text-sm'>{emailError}</div>
            )}

        </div>
        <div className='w-full'>
          <textarea
            placeholder='Write your message here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='text-xl border-2 border-gray-400 rounded-2xl w-full lg:w-185 h-50 px-2 py-1 align-top resize-none'
          />
        </div>
        <div className='w-full flex justify-start items-center'>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`bg-red-400 p-2 rounded-xl text-white cursor-pointer hover:bg-red-600 ${
              isDisabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </div>

        {status && (
          <div className='w-full text-green-600 font-semibold'>
            {status}
          </div>
        )}
      </div>

      <div className=' w-full'>
        <div className='w-full text-xl flex justify-start items-center gap-5'>Check out the source code of this project on <a href='https://github.com/vishalvishwas01/TaskManager' target='_blank'><svg width="34px" height="34px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg></a></div>
      </div>

      <div className='w-full text-xl flex flex-wrap justify-start items-center gap-5'>Report any bug on: <div className='flex justify-center items-center gap-4 text-gray-500'>vishalvishwas7082@gmail.com <button onClick={handleCopy} className='cursor-pointer'><svg width="34px" height="34px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="#080341"></path> </g></svg></button>{copied && <span className='text-green-500 ml-2'>Copied!</span>}</div></div>
    </div>
  );
}

export default Hero;
