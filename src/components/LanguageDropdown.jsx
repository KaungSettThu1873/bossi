import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import mm from '../assets/img/mm.png'
import en from '../assets/img/en.png'
import { LanguageContext } from '../contexts/LanguageContext'

const LanguageDropdown = () => {
  const { content, lan, updateLanguage } = useContext(LanguageContext);

  return (
    <Dropdown>
      <Dropdown.Toggle className='border-0 px-1 px-lg-2 ' style={{ background: 'transparent' }} id="dropdown-basic">
        <img src={lan == "mm" ? mm : en} className='flag' />
      </Dropdown.Toggle>

      <Dropdown.Menu className='langDropdown mt-5  bg-dark'>
        <Dropdown.Item  
        onClick={() => updateLanguage('mm')}
        >
          <img src={mm} className='flag' />
        </Dropdown.Item>
        <Dropdown.Item  
        onClick={() => updateLanguage('en')}
        >
          <img src={en} className='flag' />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageDropdown
