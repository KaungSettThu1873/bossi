import React, { useContext } from 'react'
import { Carousel } from 'react-bootstrap'
import { GeneralContext } from '../../contexts/GeneralContext';

const Carousels = () => {
  const {banners} = useContext(GeneralContext);
  return (
    <div className='carouselContainer p-sm-4'>
      <Carousel>
        {banners && banners.map((item, index) => {
          return <Carousel.Item key={index}>
            <img src={item.img} className='bannerImg' />
          </Carousel.Item>
        })}
      </Carousel>
    </div>
  )
}

export default Carousels
