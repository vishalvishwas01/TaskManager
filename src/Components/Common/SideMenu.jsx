
import { NavLink, useNavigate} from 'react-router-dom'
import cross from '../../assets/cross.svg'
import { useState, useEffect } from 'react';

function SideMenu({showMenu, setShowMenu}) {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [logshow, setLogShow]=useState(false)

 

    const handleNavigate = () => setShowMenu(false);

  const navigate = useNavigate();

   useEffect(() => {
  if (user.name === '') {
    setLogShow(false);
  } else {
    setLogShow(true);
  }
}, [user]);

  useEffect(() => {
  const username = localStorage.getItem('username');
  if (username) {
    setLoading(true);
    fetch(`http://localhost:3003/user/${username}`)
      .then(res => res.json())
      .then(data => {
        setUser({ name: data.name, email: data.email });
      })
      .catch(err => console.error('Failed to fetch user details:', err))
      .finally(() => setLoading(false));
  }
}, []);

 useEffect(() => {
  if (user.name === '') {
    setLogShow(false);
  } else {
    setLogShow(true);
  }
}, [user]);

  const handleLogout = () => {
    localStorage.clear();
    setUser({ name: '', email: '' }); 
    navigate('/');
    window.location.reload();
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
    
  };



      const baseClass =
    'group flex gap-3 justify-start items-center w-2xs h-14 rounded-2xl px-4 text-2xl cursor-pointer transition-all';
  const iconBaseClass = 'transition-colors duration-300';
  
  return (
     <div className={`fixed inset-0 z-20 ${showMenu ? 'pointer-events-auto' : 'pointer-events-none'}`} >
      {/* Backdrop */}
       <div className={` absolute inset-0 bg-black transition-opacity duration-300 ease-in-out ${showMenu ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setShowMenu(false)}/><div className={`flex flex-col justify-start items-center pt-8 gap-5 absolute top-0 left-0 w-[300px] h-screen bg-[#FF6767] z-60 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className=' w-64 h-24 flex justify-between items-center'>
          <div className='flex flex-col  w-50'>
       {loading ? (
          <div className="text-white text-lg">Loading...</div>
        ) : user.name && user.email ? (
          <>
            <div className='font-semibold text-xl text-white'>{user.name}</div>
            <div className='font-normal text-white'>{user.email}</div>
          </>
        ) : (
          <button
            onClick={handleSignupRedirect}
            className='text-white bg-transparent border border-white rounded-lg px-4 py-2 mt-2 hover:bg-white hover:text-[#FF6767] transition cursor-pointer'
          >
            Sign In / Sign Up
          </button>
        )}
        </div>
        <button  onClick={() => setShowMenu(false)} className='cursor-pointer'><img src={cross}/></button>
      </div>

       <NavLink
          to="/"
          onClick={handleNavigate}
          className={({ isActive }) =>
            `${baseClass} mb-0 ${isActive ? 'bg-white text-[#FF6767]' : 'text-white hover:bg-white hover:[color:#FF6767]'} text-auto w-[90%] z-70`
          }
        >


        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconBaseClass} ${
            window.location.pathname === '/' ? 'fill-[#FF6767]' : 'fill-white group-hover:fill-[#FF6767]'
          }`}
        >
          <path d="M13 12C13 11.4477 13.4477 11 14 11H19C19.5523 11 20 11.4477 20 12V19C20 19.5523 19.5523 20 19 20H14C13.4477 20 13 19.5523 13 19V12Z" />
          <path d="M4 5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V12C10 12.5523 9.55228 13 9 13H5C4.44772 13 4 12.5523 4 12V5Z" />
          <path d="M4 17C4 16.4477 4.44772 16 5 16H9C9.55228 16 10 16.4477 10 17V19C10 19.5523 9.55228 20 9 20H5C4.44772 20 4 19.5523 4 19V17Z" />
          <path d="M13 5C13 4.44772 13.4477 4 14 4H19C19.5523 4 20 4.44772 20 5V7C20 7.55228 19.5523 8 19 8H14C13.4477 8 13 7.55228 13 7V5Z" />
        </svg>
        Dashboard
      </NavLink>

            <NavLink
              to="/MyTask"
              className={({ isActive }) =>`${baseClass} mb-0 ${isActive ? 'bg-white text-[#FF6767]' : 'text-white hover:bg-white hover:[color:#FF6767]'} text-auto w-[90%]`}>
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${iconBaseClass} stroke-current`}
                strokeWidth="1.5"
              >
                <g strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.37 8.87988H17.62" />
                  <path d="M6.38 8.87988L7.13 9.62988L9.38 7.37988" />
                  <path d="M12.37 15.8799H17.62" />
                  <path d="M6.38 15.8799L7.13 16.6299L9.38 14.3799" />
                  <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" />
                </g>
              </svg>
              My Task
            </NavLink>
      
            <NavLink
                   to="/history"
                   className={({ isActive }) =>`${baseClass} mb-0 ${isActive ? 'bg-white text-[#FF6767]' : 'text-white hover:bg-white hover:[color:#FF6767]'} text-auto w-[90%]`}>
                   <svg
                      width="44"
                     height="44"
                     viewBox="0 0 24 24"
                     fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg"
                     className={`${iconBaseClass} fill-current`}
                   >
                     <path d="M12 8V12L14.5 14.5" />
                     <path d="M5.60423 5.60423L5.0739 5.0739V5.0739L5.60423 5.60423ZM4.33785 6.87061L3.58786 6.87438C3.58992 7.28564 3.92281 7.61853 4.33408 7.6206L4.33785 6.87061ZM6.87963 7.63339C7.29384 7.63547 7.63131 7.30138 7.63339 6.88717C7.63547 6.47296 7.30138 6.13549 6.88717 6.13341L6.87963 7.63339ZM5.07505 4.32129C5.07296 3.90708 4.7355 3.57298 4.32129 3.57506C3.90708 3.57715 3.57298 3.91462 3.57507 4.32882L5.07505 4.32129ZM3.75 12C3.75 11.5858 3.41421 11.25 3 11.25C2.58579 11.25 2.25 11.5858 2.25 12H3.75ZM16.8755 20.4452C17.2341 20.2378 17.3566 19.779 17.1492 19.4204C16.9418 19.0619 16.483 18.9393 16.1245 19.1468L16.8755 20.4452ZM19.1468 16.1245C18.9393 16.483 19.0619 16.9418 19.4204 17.1492C19.779 17.3566 20.2378 17.2341 20.4452 16.8755L19.1468 16.1245ZM5.14033 5.07126C4.84598 5.36269 4.84361 5.83756 5.13505 6.13191C5.42648 6.42626 5.90134 6.42862 6.19569 6.13719L5.14033 5.07126ZM18.8623 5.13786C15.0421 1.31766 8.86882 1.27898 5.0739 5.0739L6.13456 6.13456C9.33366 2.93545 14.5572 2.95404 17.8017 6.19852L18.8623 5.13786ZM5.0739 5.0739L3.80752 6.34028L4.86818 7.40094L6.13456 6.13456L5.0739 5.0739ZM4.33408 7.6206L6.87963 7.63339L6.88717 6.13341L4.34162 6.12062L4.33408 7.6206ZM5.08784 6.86684L5.07505 4.32129L3.57507 4.32882L3.58786 6.87438L5.08784 6.86684ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM16.1245 19.1468C14.9118 19.8483 13.5039 20.25 12 20.25V21.75C13.7747 21.75 15.4407 21.2752 16.8755 20.4452L16.1245 19.1468ZM20.25 12C20.25 13.5039 19.8483 14.9118 19.1468 16.1245L20.4452 16.8755C21.2752 15.4407 21.75 13.7747 21.75 12H20.25ZM6.19569 6.13719C7.68707 4.66059 9.73646 3.75 12 3.75V2.25C9.32542 2.25 6.90113 3.32791 5.14033 5.07126L6.19569 6.13719Z" />
                   </svg>
                   History
                 </NavLink>
           
                  <NavLink
                   to="/settings"
                   className={({ isActive }) =>`${baseClass} mb-0 ${isActive ? 'bg-white text-[#FF6767]' : 'text-white hover:bg-white hover:[color:#FF6767]'} text-auto w-[90%]`}>
                   <svg
                     width="44px"
                     height="44px"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     className={`${iconBaseClass} stroke-current`}
                   >
                     <circle cx="12" cy="12" r="3" strokeWidth="1.5"></circle>
                     <path
                       d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273"
                       strokeWidth="1.5"
                       strokeLinecap="round"
                     />
                   </svg>
                   Settings
                 </NavLink>

                 <NavLink
        to="/contact"
        className={({ isActive }) =>
          `${baseClass} mb-0 ${isActive ? 'bg-white text-[#FF6767]' : 'text-white hover:bg-white hover:[color:#FF6767]'} text-auto w-[90%]`
        }
      >
        <svg
          width="44px"
          height="44px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconBaseClass} stroke-current`}
        >
          <path d="M18,16 C20.20915,16 22,14.20915 22,12 C22,9.79085 20.20915,8 18,8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6,8 C3.79086,8 2,9.79085 2,12 C2,14.20915 3.79086,16 6,16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6,16 L6,15.75 L6,14.5 L6,12 L6,8 C6,4.68629 8.6863,2 12,2 C15.3137,2 18,4.68629 18,8 L18,16 C18,19.3137 15.3137,22 12,22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Contact
      </NavLink>




      {user.name !== '' && 
      <button
        onClick={handleLogout}
        className='text-white hover:bg-white hover:[color:#FF6767] w-[90%] rounded-2xl text-2xl px-4 py-2 flex justify-start items-center gap-5 cursor-pointer'
      >
        <div>
        <svg
        width="44px"
        height="44px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconBaseClass} stroke-current`}
      >
        <path
          d="M14 20H6C4.89543 20 4 19.1046 4 18L4 6C4 4.89543 4.89543 4 6 4H14M10 12H21M21 12L18 15M21 12L18 9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      </div>
        Logout
      </button>
      }

              


      
    </div>
    </div>
  )
}

export default SideMenu
