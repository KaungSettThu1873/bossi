import React, { useContext } from "react";
import home from "../../assets/img/home.png";
import titok from "../../assets/img/titokWhite.svg";
import "../../assets/css/footer.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { LanguageContext } from '../../contexts/LanguageContext';
import { GameContext } from '../../contexts/GameContext';
import all from '../../assets/img/all.png';
import slot from '../../assets/img/slotL.png';
import casino from '../../assets/img/casinoL.png';

const BottomMenu = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { content } = useContext(LanguageContext);
  const { types, providers, updateType } = useContext(GameContext);

  // Helper function to determine if a link is active
  const isActive = (path, typeId = null) => {
    if (typeId !== null) {
      const currentType = searchParams.get('type');
      return currentType === typeId;
    }
    return location.pathname === path;
  };

  // Get icon color class based on active state
  const getIconClass = (path, typeId = null) => {
    return `fixedBottomIcon ${isActive(path, typeId) ? 'activeColor' : ''}`;
  };

  return (
    <div className="bottomMenu">
      <div className="d-flex justify-content-around bottomMenu app-gradient provider_list overflow-x-auto">
        <div className="py-3 text-center">
          <Link to="/reels">
            <img 
              src={titok} 
              className={getIconClass('/reels')} 
              alt="TikTok" 
            />
          </Link>
        </div>
        
        <div className="py-3 text-center">
          <Link to="/">
            <img 
              src={home} 
              className={getIconClass('/')+'normalColor'} 
              alt="Home" 
            />
          </Link>
        </div>
        
        {types && types.map((item, index) => (
          <div key={index} className="py-3 text-center" onClick={() => updateType(item.id)}>
            <Link to={`/games?type=${item.id}&provider=${providers?.[0]?.code}`}>
              <img 
                src={item.img} 
                className={`${getIconClass('/games', item.id)} ${index === 1 ? 'normalColor' : ''}`} 
                alt={item.name} 
              />
            </Link>
          </div>
        ))}
        
        <div className="py-3 text-center">
          <Link to="/games?tab=table">
            <img 
              src={all} 
              className={getIconClass('/games?tab=table')} 
              alt="All" 
            />
          </Link>
        </div>
        
        <div className="py-3 text-center">
          <Link to="/games?tab=card">
            <img 
              src={slot} 
              className={getIconClass('/games?tab=card')} 
              alt="Slots" 
            />
          </Link>
        </div>
        
        <div className="py-3 text-center">
          <Link to="/games?tab=bingo">
            <img 
              src={casino} 
              className={getIconClass('/games?tab=bingo')} 
              alt="Casino" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomMenu;