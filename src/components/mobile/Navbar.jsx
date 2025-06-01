import { useContext, useDebugValue, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import '../../assets/css/navbar.css'
import { IoMdClose, IoMdRefreshCircle } from "react-icons/io";
import home from '../../assets/img/home.svg';
import logo from '../../assets/img/logo.png';
import money from '../../assets/img/money.png';
import register from '../../assets/img/register.svg';
import promotion from '../../assets/img/promotion.svg';
import trophy from '../../assets/img/trophy.svg';
import profile from '../../assets/img/profile.svg';
import contact from '../../assets/img/contact.svg';
import deposit from '../../assets/img/deposit.svg';
import coin from '../../assets/img/coin.png'
import refresh from '../../assets/img/reload.svg'
import about from '../../assets/img/about.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaViber } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { BsArrowRepeat } from 'react-icons/bs';
import { FaRepeat } from 'react-icons/fa6';
import { Button, Spinner } from 'react-bootstrap';
import LanguageDropdown from '../LanguageDropdown';
import social24 from '../../assets/img/social24.svg'
import line from '../../assets/img/lineW.svg'
import tele from '../../assets/img/telew.svg'
import viber from '../../assets/img/viberw.svg'
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import { AlignJustifyIcon } from 'lucide-react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { AuthContext } from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import fb from '../../assets/img/fb.png'
import useLogout from '../../hooks/useLogout';
 
function Navbar() {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const navLinks = [
    { img: home, name: content?.nav?.home, link: '/' },
    { img: profile, name: content?.profile?.my_profile, link: '/information?tab=profile' },
    { img: money, name: content?.wallet?.wallet, link: '/information?tab=transfer' },
    { img: promotion, name: content?.nav?.promotion, link: '/promotion' },
    { img: contact, name: content?.nav?.contact, link: '/contact' },
    { img: trophy, name: content?.nav?.ranking, link: '/ranking' }

  ];
  const [show, setShow] = useState(false);

  const { data } = useFetch(BASE_URL + "/contact");
  // console.log(data);
  
  const contacts = data?.map((contact) => ({
    ...contact, // Copy existing object properties
    image: contact.name == "Viber"
      ? viber
      : contact.name == "Telegram"
        ? tele
        : contact.name == "Facebook"
          ? fb
          : null, // Default to null if no condition matches
  }));

  const { logout, loading } = useLogout();
  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  }

  return (
    <>
      <div className='navbar py-0 px-2 shadow-lg '>
        <div className="d-flex align-items-center gap-1 gap-sm-2">
          <div onClick={() => setShow(true)} className=" cursor-pointer py-1 px-2 rounded text-white" style={{ background: '#00000042' }}>
            <AlignJustifyIcon size={25} />
          </div>
          <Link to={'/'}>
            <img src={logo} className="navLogo" />
          </Link>
        </div>
        <div className="d-flex align-items-center gap-1 gap-sm-2">
          {/* <Link to={'/information?tab=transfer'} >
                <img src={deposit} className='navDepositImg' />
              </Link> */}
          <div>
            <Link to={'/information?tab=profile'} >
              <div className="">
                <div>
                  <img src={profile} className='navProfileImg' />
                  <small className='ms-1 fw-semibold'>{user?.name}</small>
                </div>
                <div className="moneyGroup gap-1 rounded-5 py-1 px-1">
                  <img src={coin} className='navCoin' />
                  <small className=' fw-semibold'>{user?.balance} Ks</small>
                  {/* <img src={refresh} className='navRefresh' /> */}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Offcanvas className='sidebar text-white ' show={show} onHide={() => setShow(false)}>
        <div className=" px-sm-2">
          <Offcanvas.Header className=' w-100'>
            <Offcanvas.Title className='w-100 d-flex align-items-center justify-content-between'>
              <p> </p>
              <IoMdClose onClick={() => setShow(false)} className='cursor-pointer' size={30} color='#fff' />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className='w-100'>
            {navLinks.map((item, index) => {
              return <div onClick={() => {
                navigate(item.link)
                setShow(false)
              }} key={index} className="cursor-pointer  mb-3 d-flex align-items-center gap-2 gap-sm-3">
                <img src={item.img} className='sideBarImg' />
                <p className='  sidebarTitle'>{item.name}</p>
              </div>
            })}
            <div className="text-center mt-4">
              <button 
              onClick={handleLogout}
              className="bg-red button-bottom rounded-4 w-100 text-white">
                {loading && <Spinner className='me-2' animation="border" size="sm" />}
                {content?.profile?.logout}
              </button>
            </div>
            <div className='my-3'>
              <a href='https://ponewine20x.xyz/assets/app/bossi.apk' target='_blank' className="btn btn-outline-light w-100">
                {/* <img src="" alt="" /> */}
                Download App
              </a>
            </div>
            <div className="mt-4 mb-5 d-flex align-items-center  justify-content-center gap-4">
              {contacts && contacts.map((contact, index) => {
                return (
                  <Link to={contact.link} key={index}>
                    <img src={contact.image} className="rounded-3" width={50} />
                  </Link>
                );
              })}
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navbar;