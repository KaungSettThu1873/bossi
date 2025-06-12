import React, { useContext } from 'react'
import Marquee from '../components/mobile/Marquee'
import { LanguageContext } from '../contexts/LanguageContext'
import useFetch from '../hooks/useFetch'
import BASE_URL from '../hooks/baseUrl'


const AdsVideo = () => {
//   const { content } = useContext(LanguageContext);
const { data } = useFetch( BASE_URL + '/videoads')
    console.log('data',data);

  return (<>
    <div className="d-flex align-items-center bg-black">
      <Marquee />
      
    </div>
    <div className='py-4 px-3 px-sm-5 mx-lg-5 mb-5'>
      <h4 className="fw-bold text-center mb-5">AdsVideo</h4>
      <div className="row">
        {/* {promotions && promotions.map((item, index) => (
          <div className='col-md-12 mb-4' key={index}>
            <div className='py-3 rounded border '>
              <h4 className='ms-4 mb-0'>{item.title}</h4>
              <img src={ "https://luckymillion.pro/api/.."+item.img_url} className='my-3 my-sm-4 img-fluid' />
              <p className='mx-4'>{item.description}</p>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  </>
  )
}

export default AdsVideo;
