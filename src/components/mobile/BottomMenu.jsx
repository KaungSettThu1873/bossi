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
import { AuthContext } from "../../contexts/AuthContext";
const BottomMenu = () => {
    const { user } = useContext(AuthContext);
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
    (user && (<>
 <div className="bottomMenu  ">
      <div className="d-flex justify-content-around bottomMenu text-warning provider_list overflow-x-auto">
        <div className="py-3 text-center">
          <Link to="/?type=all">
             <i className="fa-solid fa-home me-2"></i>
          </Link>
        </div>
                
        <div className="py-3 text-center">
          <Link to="/information?tab=profile">
          <i className="fa-solid fa-user"></i>
          </Link>
        </div>
        
        <div className="py-3 text-center">
          <Link to="/information?tab=transfer">
           <i className="fa-solid fa-money-bill-transfer"></i>
          </Link>
        </div>
        
       
      </div>
    </div>
    </>))
   
  );
};

export default BottomMenu;