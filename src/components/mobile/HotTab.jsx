import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap';
import { GameContext } from '../../contexts/GameContext';

const HotTab = () => {

  return (
    <div className='container-fluid mb-5'>
      <h2 className='my-3'>Hot Games</h2>
      <div className="row mx-1 mb-5 pb-5">
        {loading ? <Spinner /> : 
        hotgames.length > 0 ? hotgames.map((item, index) => (
        <div
          key={index}
          className="p-0 cursor-pointer col-4 col-md-2 mb-3"
          onClick={launchGame(item.product_code, item.game_type_id, item.code)}
        >
          <img
            src={item.image_url}
            alt={`Game ${index}`}
            className="rounded-3 hotgame"

          />
        </div>
        )) : <h4 className='text-center'>There is no game list.</h4>}
      </div>
    </div>
  )
}

export default HotTab
