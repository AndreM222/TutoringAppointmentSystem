import { useEffect, useRef, useContext } from 'react';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar-icon.png';
import {NavLink, Link} from 'react-router-dom';
import {BiMenu} from 'react-icons/bi'
import { authContext } from '../../context/AuthContext';

const navLinks = [
  {
    path:'/home',
    display:'Home',
  },
  {
    path:'/tutors',
    display:'Find Your Tutor',
  },
  {
    path:'/bookings',
    display:'Bookings',
  },
  {
    path:'/services',
    display:'Services',
  },
  {
    path:'/contact',
    display:'Contact',
  },
]

const Header = () => {

  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const {user, role, token} = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  }

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  });

  const toggleMenu = ()=> menuRef.current.classList.toggle('show__menu');

  return (
    <header className='header flex items-center' ref={headerRef}>
      <div className="container">
        <div className='flex items-center justify-between'>
          <div>
            <img src={logo} alt="" />
          </div>

          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
              {
                navLinks.map((link, index) => <li key={index}>
                  <NavLink to={link.path} className={navClass => navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
                </li>)
              }
            </ul>
          </div>

          <div className='flex items-center gap-4'>
            {token && user ? (
              <div className='flex items-center justify-center'>
                <Link to={`${role==='tutor' ? '/tutors/profile/me' : '/users/profile/me'}`}>
                  <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                    <img src={user?.photo} alt="" className='w-full rounded-full' />
                  </figure>
                </Link>
                <h2 className='pl-3'>{user?.name}</h2>
              </div>
            ): (
              <Link to='/login'>
                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>
                  Login
                </button>
              </Link>
            )}
              <span className='md:hidden' onClick={toggleMenu}>
                <BiMenu className='w-6 h-6 cursor-pointer' />
              </span>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
