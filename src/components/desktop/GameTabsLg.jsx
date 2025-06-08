import React, { useContext, useEffect, useState } from "react";
import all from "../../assets/img/all.png";
import slot from "../../assets/img/slotL.png";
import casino from "../../assets/img/casinoL.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";
import { GameContext } from "../../contexts/GameContext";
import { AuthContext } from "../../contexts/AuthContext";
import GameList from "./GameList";
import ProviderList from "./ProviderList";
import shan from "../../assets/img/shan.jpg";
import ponewine from "../../assets/img/ponewine.jpg";
import styles from "./GameTabsLg.module.css";

const GameTabsLg = () => {
  const { content } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const provider = searchParams.get("provider");
  const {
    types: gameTabs,
    providersData: providers,
    game_lists: games,
    loading,
    hot_games,
    table_games,
    card_games,
    bingo_games,
  } = useContext(GameContext);
  // const gameProvider = providers && providers.find((p) => p?.code == provider)?.id;

  // const providerUrl = https://luckymillion.pro/api/providers/

  const baseImageMap = {
    1: "/images/Final_All/Slot/SlotPng.png",
    2: "/images/Final_All/Casino/LiveCasinoPNG.png",
    3: "/images/Final_All/Sport Book/SportPNG.png",
    4: "/images/Final_All/Virtual Sport/VirtualSportPNG.png",
    5: "/images/Final_All/Lottery/LotteryPNG.png",
    // 6: "//assets/img/my_local_images/qipai.png",
    7: "/images/Final_All/P2P/P2PPNG.png",
    8: "/images/Final_All/Fishing/FishingPng.png",
    9: "/images/Final_All/Cock Fighting/CockFishingPNG_00000.png",
    10: "/images/Final_All/Bonus/BonusPNG.png",
    11: "/images/Final_All/E-Sport/E- SportPNG.png",
    // 12: "//assets/img/my_local_images/poker.png",
    // 13: "//assets/img/my_local_images/others.png",
    // 14: "//assets/img/my_local_images/premium.png",
  };

  const activeImageMap = {
    1: "/images/Final_All/Slot/APNG Slot.png",
    2: "/images/Final_All/Casino/APNGLive Casino.png",
    3: "/images/Final_All/Sport Book/Sport Sport Book APNG.png",
    4: "/images/Final_All/Virtual Sport/APNG Virtual sport.png",
    5: "/images/Final_All/Lottery/APNG Lottery.png",
    // 6: "/./assets/my_local_images/qipai.png",
    7: "/images/Final_All/P2P/APNG P2P.png",
    8: "/images/Final_All/Fishing/APNG fishing.png",
    9: "/images/Final_All/Cock Fighting/Cock Fishing APNG.png",
    10: "/images/Final_All/Bonus/APNG Bonus.png",
    11: "/images/Final_All/E-Sport/APNG E-sport.png",
    // 12: "/assets/my_local_images/poker.png",
    // 13: "/assets/my_local_images/others.png",
    // 14: "/assets/my_local_images/premium.png",
  };

  // Use the first game type's image as a fallback for All Games/Hot Games
  const defaultTabImg = gameTabs && gameTabs.length > 0 ? gameTabs[0].img : "";

  return (
    <div className="px-4 d-lg-block ">
      <div className={styles.tabScrollRow}>
        {/* <button
          className={`${styles.tabBtn} ${type === "all" ? styles.tabBtnActive : ""}`}
          onClick={() => navigate("/?type=all")}
        >
          <img src={defaultTabImg} className={styles.tabBtnImg} alt="All Games" />
          <span>All Games</span>
        </button> */}
        <button
          className={`${styles.tabBtn} ${
            type === "hot" ? styles.tabBtnActive : ""
          }`}
          onClick={() => navigate("/?type=hot")}
        >
  
          <img
            src={'../src/assets/img/hot.png'}
            className={styles.tabBtnImg}
            alt="Hot Games"
          />
          <span className="gameTabFontSize">Hot Games</span>
        </button>
        {gameTabs &&
          gameTabs
            .filter((item) => ![6, 12, 13, 14].includes(item.id))
            .map((item) => (
              <button
                key={item.id}
                className={`${styles.tabBtn} ${
                  type == item.id ? styles.tabBtnActive : ""
                }`}
                onClick={() => navigate(`?type=${item.id}`)}
              >
                <img
                  src={
                    type == item.id
                      ? activeImageMap[item.id]
                      : baseImageMap[item.id]
                  }
                  className={styles.tabBtnImg}
                  alt={item.name}
                />
                <span className="gameTabFontSize">{item.name}</span>
              </button>
            ))}
      </div>
      <div className="row mt-3">
        {/* gamelists */}
        {type && provider && <GameList loading={loading} games={games} />}
        {type == "hot" && (
          <>
            <h5 className="mb-3">{content?.game_type?.hot}</h5>
            <GameList loading={loading} games={hot_games} />
          </>
        )}
        {/* {/* {type == "table" && (
          <>
            <h5 className='mb-3'>Table Games</h5>
            <GameList loading={loading} games={table_games} />
          </>
        )} */}
        {/* {type == "card" && (
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
        )}  */}
        {type == "all" && !provider && (
          <>
            <div>
              <h5 className="mb-3 fw-bold text-warning">
                {content?.game_type?.burmese}
              </h5>
              <div className="d-flex overflow-auto  ">
                <div className="ms-3 mb-4 me-2">
                  <Link
                    to={`https://goldendragon7.pro/?user_name=${user?.user_name}&balance=${user?.balance}`}
                    target="_blank"
                    className="flex-shrink-0"
                    // style={{ width: "130px" }}
                  >
                    <div className="gold-card rounded-4 ">
                      <img
                        className="card-ratio"
                        style={{
                          // height: "200px",
                          borderTopLeftRadius: "1rem",
                          borderTopRightRadius: "1rem",
                          border: "none",
                        }}
                        src={shan}
                        alt=""
                      />
                      <div
                        className="px-3 py-2  mt-1"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "#fff",
                          overflow: "hidden !important",
                          borderRadius: "200px",
                        }}
                      >
                        <h6
                          className="mb-1"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "13px",
                          }}
                        >
                          Shan
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <small className="fw-medium text-white"></small>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="mb-4">
                  <Link
                    to={`https://ponewine20x.netlify.app/?user_name=${user?.user_name}&balance=${user?.balance}`}
                    target="_blank"
                    className="flex-shrink-0"
                    // style={{ width: "250px" }}
                  >
                    <div className="gold-card rounded-4 ">
                      <img
                        className="card-ratio"
                        style={{
                          // height: "200px",
                          borderTopLeftRadius: "1rem",
                          borderTopRightRadius: "1rem",
                        }}
                        src={ponewine}
                        alt=""
                      />
                      <div
                        className="px-3 py-2  mt-1"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          color: "#fff",
                          overflow: "hidden !important",
                          borderRadius: "200px",
                        }}
                      >
                        <h6
                          className="mb-1"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "13px",
                          }}
                        >
                          PoneWine
                        </h6>
                        <div className="d-flex align-items-center gap-2">
                          <small className="fw-medium text-white"></small>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
              {gameTabs &&
                gameTabs.map((tab, index) => (
                  <div className="w-100" key={index}>
                    <h4 className="mb-3 fw-bold text-warning mt-3">
                      {tab.name}
                    </h4>
                    <ProviderList typeCode={tab?.code} type={tab} />
                  </div>
                ))}
            </div>
          </>
        )}

        {!provider &&
          gameTabs &&
          gameTabs.map(
            (tab, index) =>
              type == tab.id && (
                <div className="w-100" key={index}>
                  <h5 className="mb-3">{tab.name}</h5>
                  <ProviderList typeCode={tab?.code} type={tab} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default GameTabsLg;
