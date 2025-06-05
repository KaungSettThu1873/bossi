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
import Register from '../../pages/Register';
import Login from '../../pages/Login';
import useFetch from '../../hooks/useFetch';
import BASE_URL from '../../hooks/baseUrl';
import fb from '../../assets/img/fb.png'
import useLogout from '../../hooks/useLogout';
 
function Navbar() {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    { img: home, name: content?.nav?.home, link: '/' },
    { img: profile, name: content?.profile?.my_profile, link: '/information?tab=profile' },
    { img: money, name: content?.wallet?.wallet, link: '/information?tab=transfer' },
    { img: promotion, name: content?.nav?.promotion, link: '/promotion' },
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
   <nav className="nav-design-mobile p-2 text-white">
  <div className="d-flex justify-content-between align-items-center">
    <img src={logo} width={30} height={30} alt="Logo" />

    <div className="d-flex align-items-center gap-2 flex-wrap">
      {!user && (
        <>
          <button
            onClick={() => setShowLogin(true)}
            className="btn btn-outline-warning btn-sm"
          >
            Login
          </button>
          <Login show={showLogin} handleClose={() => setShowLogin(false)} />

          <button
            onClick={() => setShowRegister(true)}
            className="btn btn-warning btn-sm"
          >
            Join Now
          </button>
          <Register show={showRegister} onClose={() => setShowRegister(false)} />
        </>
      )}

      {user && (
        <>
          <button className="btn btn-warning btn-sm">
            <i className="fa-solid fa-money-check-dollar me-1"></i>
            {user?.balance}
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-outline-warning btn-sm"
          >
            {loading && (
              <Spinner
                style={{ marginRight: "0.5rem" }}
                animation="border"
                size="sm"
              />
            )}
            <i className="fa-solid fa-right-from-bracket me-1"></i>
            {content?.profile?.logout || "Logout"}
          </button>
        </>
      )}

      <LanguageDropdown />

      <div
        onClick={() => setShow(true)}
        className="cursor-pointer py-1 px-2 rounded text-white bg-black bg-opacity-25"
      >
        <AlignJustifyIcon size={22} />
      </div>
    </div>
  </div>
</nav>
     <Offcanvas
        show={show}
        onHide={() => setShow(false)}
        placement="end"
        style={{
          backgroundColor: "#1e1e1e",
          color: "white",
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.7)",
          width: "280px",
          height: "450px",
          maxHeight: "100vh",
          overflowY: "auto",
          position: "fixed",
          top: "15%",
          right: 0,
        }}
      >
        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Offcanvas.Header
            style={{
              width: "100%",
              borderBottom: "1px solid #444",
              paddingBottom: "1rem",
            }}
          >
            <Offcanvas.Title
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Menu
              </span> */}
              <IoMdClose
                onClick={() => setShow(false)}
                style={{ cursor: "pointer" }}
                size={26}
                color="#fff"
              />
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body style={{ paddingTop: "1rem" }}>
            {navLinks.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.link);
                  setShow(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "background 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#292929")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <img
                  src={item.img}
                  alt=""
                  width={24}
                  style={{
                    marginRight: "12px",
                    filter: "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
                  }}
                />
                <p style={{ margin: 0, fontSize: "1rem", fontWeight: 500 }}>
                  {item.name}
                </p>
              </div>
            ))}

        
       

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  width: "100%",
                  borderRadius: "30px",
                  padding: "5px",
                  fontWeight: "bold",
                }}
              >
                {loading && (
                  <Spinner
                    style={{ marginRight: "0.5rem" }}
                    animation="border"
                    size="sm"
                  />
                )}
                {content?.profile?.logout}
              </button>
            </div>

            <div style={{ margin: "1.5rem 0" }}>
              <a
                href="https://ponewine20x.xyz/assets/app/bossi.apk"
                target="_blank"
                style={{
                  display: "inline-block",
                  textAlign: "center",
                  border: "1px solid #fff",
                  padding: "5px",
                  borderRadius: "999px",
                  color: "white",
                  textDecoration: "none",
                  width: "100%",
                  fontWeight: 600,
                }}
                rel="noreferrer"
              >
                Download App
              </a>
            </div>

            <div
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {/* {contacts &&
                contacts.map((contact, index) => (
                  <Link to={contact.link} key={index}>
                    <img
                      src={contact.image}
                      alt=""
                      width={45}
                      height={45}
                      style={{
                        borderRadius: "50%",
                        boxShadow: "0 0 6px rgba(0,0,0,0.4)",
                      }}
                    />
                  </Link>
                ))} */}
            </div>
          </Offcanvas.Body>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navbar;