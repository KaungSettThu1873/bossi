import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/auth.css'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import useLogin from "../hooks/useLogin"
import BASE_URL from '../hooks/baseUrl'
import { Spinner } from 'react-bootstrap'
import { LanguageContext } from "../contexts/LanguageContext"
import FooterMarquee from '../components/mobile/FooterMarquee'
import logo from "../assets/img/logo.png"


const LoginPage = () => {
  const { content, lan } = useContext(LanguageContext);
  const [pwType, setPwType] = useState('password');
  const togglePwType = () => {
    setPwType(pwType === 'text' ? 'password' : 'text');
  }

  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading, errMsg } = useLogin();
  const handleLogin = async (e) => {
    e.preventDefault();
    let url = BASE_URL + "/login";
    let inputData = { user_name, password };
    await login(url, inputData);
  }


  return (
    <>

      <div className='row justify-content-center align-items-center mt-5'>
        <div className="col-lg-3 col-md-5 col-sm-6 col-9">
          <div>
            <img src={logo} width={300} alt="" />
            <h1 className={`fw-semibold text-warning2 text-center mb-4`}>{content?.auth?.login.toUpperCase()}</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="my-3">
              <input
                type="text"
                placeholder={content?.profile?.username}
                className={`w-full py-2 rounded-5 px-4`}
                onChange={(e) => setUsername(e.target.value)}
                value={user_name}
              />
              {error ? (error.user_name && <p className='ms-2 text-danger'>{error.user_name}</p>) : errMsg && <p className='text-danger'>{errMsg}</p>}
            </div>
            <div className="my-3">
              <div className="d-flex bg-white rounded-5 w-full">
                <input
                  type={pwType}
                  placeholder={content?.auth?.password}
                  className={`rounded-start-5 w-full px-4 py-2 border border-0 focus-ring-none`}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div onClick={togglePwType} className='rounded-end-5 bg-secondary d-flex align-items-center justify-content-center px-3'>
                  {pwType === 'text' ?
                    <EyeIcon className='text-white ' /> :
                    <EyeOffIcon className='text-white ' />
                  }
                </div>
              </div>
              {error && error.password && <p className='ms-2 text-danger'>{error.password}</p>}
            </div>
            <button
              type='submit'
              className={`mb-3 py-1 rounded-4 bg-red button-bottom text-white w-100 ${lan === "mm" ? "mm-font" : ""}`}>
              {loading && <Spinner className='me-1' size="sm" />}
              {content?.auth?.login.toUpperCase()}
            </button>
            <Link to={'/register'}
              className={`mb-3 py-1 rounded-4 bg-black2 button-bottom w-100 d-block text-center ${lan === "mm" ? "mm-font" : ""}`}>
              {content?.auth?.new_member.toUpperCase()}
            </Link>
          </form>
        </div>
      </div>
      <FooterMarquee />
    </>
  )
}

export default LoginPage
