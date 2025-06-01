import React, { useContext, useEffect, useState } from 'react'
import all from '../../assets/img/all.png'
import slot from '../../assets/img/slotL.png'
import casino from '../../assets/img/casinoL.png'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { LanguageContext } from '../../contexts/LanguageContext'
import { GameContext } from '../../contexts/GameContext'
import { AuthContext } from '../../contexts/AuthContext'
import GameList from './GameList'
import ProviderList from './ProviderList'
import shan from "../../assets/img/shan.jpg";
import ponewine from "../../assets/img/ponewine.jpg";


const GameTabsLg = () => {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type');
  const provider = searchParams.get('provider');
  const { types: gameTabs, providersData: providers, game_lists: games, loading, hot_games, table_games, card_games, bingo_games } = useContext(GameContext);
  // const gameProvider = providers && providers.find((p) => p?.code == provider)?.id;

  return (
    <div className='px-4 d-none d-lg-block '>
      <div className="d-flex mt-4 align-items-center gap-2 text-center overflow-x-auto">
        {/* types */}
        <Link to={'/?type=all'} className="cursor-pointer w-100">
          <div className={`w-100 py-2 rounded-3 ${type == "all" ? "activeGameList" : 'bg-light'}`}>
            <img src={all} className='rounded-3 ' width={50} height={50} />
            <div className='rounded-bottom-3' >All Games</div>
          </div>
        </Link>
        <Link to={'/?type=hot'} className="cursor-pointer w-100">
          <div className={`w-100 py-2 rounded-3 ${type == "hot" ? "activeGameList" : 'bg-light'}`}>
            <img src={all} className='rounded-3 ' width={50} height={50} />
            <div className='rounded-bottom-3' >Hot Games</div>
          </div>
        </Link>
        {gameTabs && gameTabs.map((item, index) => {
          return <div onClick={() => {
            navigate(`?type=${item.id}`)
          }} key={index} className="cursor-pointer w-100">
            <div className={`w-100 py-2 rounded-3 ${type == item.id ? "activeGameList" : 'bg-light'}`}>
              <img src={item.img} className='rounded-3 ' width={50} height={50} />
              <div className='rounded-bottom-3' >{item.name}</div>
            </div>
          </div>
        })}
        <Link to={'/?type=table'} className="cursor-pointer w-100">
          <div className={`w-100 py-2 rounded-3 ${type == "table" ? "activeGameList" : 'bg-light'}`}>
            <img src={slot} className='rounded-3 ' width={50} height={50} />
            <div className='rounded-bottom-3' >Tables</div>
          </div>
        </Link>
        <Link to={'/?type=card'} className="cursor-pointer w-100">
          <div className={`w-100 py-2 rounded-3 ${type == "card" ? "activeGameList" : 'bg-light'}`}>
            <img src={casino} className='rounded-3 ' width={50} height={50} />
            <div className='rounded-bottom-3' >Cards</div>
          </div>
        </Link>
        <Link to={'/?type=bingo'} className="cursor-pointer w-100">
          <div className={`w-100 py-2 rounded-3 ${type == "bingo" ? "activeGameList" : 'bg-light'}`}>
            <img src={slot} className='rounded-3 ' width={50} height={50} />
            <div className='rounded-bottom-3' >Bingos</div>
          </div>
        </Link>
      </div>
      <div className="row mt-4">
        {/* gamelists */}
        {(type && provider) && (
          <GameList loading={loading} games={games} />
        )}
        {type == "hot" && (
          <>
            <h5 className='mb-3'>{content?.game_type?.hot}</h5>
            <GameList loading={loading} games={hot_games} />
          </>
        )}
        {type == "table" && (
          <>
            <h5 className='mb-3'>Table Games</h5>
            <GameList loading={loading} games={table_games} />
          </>
        )}
        {type == "card" && (
          <>
            <h5 className='mb-3'>Card Games</h5>
            <GameList loading={loading} games={card_games} />
          </>
        )}
        {type == "bingo" && (
          <>
            <h5 className='mb-3'>Bingo Games</h5>
            <GameList loading={loading} games={bingo_games} />
          </>
        )}
        {(type == "all" && !provider) && (
          <>
            <div className='mb-4'>
              <h5 className='mb-3'>{content?.game_type?.burmese}</h5>
              <div className="d-flex align-items-center gap-3">
                <Link to={`https://goldendragon7.pro/?user_name=${user?.user_name}&balance=${user?.balance}`} target='_blank'>
                  <img src={shan} width={150} alt="" />
                </Link>
                <Link to={`https://ponewine20x.netlify.app/?user_name=${user?.user_name}&balance=${user?.balance}`} target='_blank'>
                  <img className='rounded-4' src={ponewine} width={150} alt="" />
                </Link>
              </div>
            </div>
            <div className="">
            {gameTabs && gameTabs.map((tab, index) => (
              <div className='w-100' key={index}>
                <h5 className='mb-3'>{tab.name}</h5>
                <ProviderList providers={tab.providers} type={tab} />
              </div>
            ))}
            </div>
          </>
        )}
        
        {!provider && gameTabs && gameTabs.map((tab, index) => (
          type == tab.id && (
            <div className='w-100' key={index}>
              <h5 className='mb-3'>{tab.name}</h5>
              <ProviderList providers={tab.providers} type={tab} />
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default GameTabsLg