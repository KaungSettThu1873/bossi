import React, { useContext, useEffect, useState } from "react";
import allWhite from "../../assets/img/allWhite.svg";
import allBlack from "../../assets/img/allBlack.svg";
import hotWhite from "../../assets/img/hotWhite.png";
import hotActive from "../../assets/img/hotActive.png";
import promotion from "../../assets/img/promotion2.svg";
import "../../assets/css/games.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../contexts/LanguageContext";

const GameHeading = () => {
  const { content } = useContext(LanguageContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get('type') ?? "promotion";
  const provider = searchParams.get('provider');


  return (
    <div
      className="gameHeading row px-0 cursor-pointer"
      style={{ overflowX: "hidden" }}
    >
      <div
        onClick={() => {
          navigate('/games?type=all')
        }}
        className={`${type === "all" ? "activeGameHeading" : ""
          } text-center  col-4 py-1 py-sm-2 `}
      >
        <img
          style={{ width: "25px", height: "25px" }}
          src={allWhite}
        />
        <small className="fw-bold d-block mt-2">{content?.game_type?.all}</small>
      </div>
      <div
        onClick={() => {
          navigate('/games?type=hot')
        }
        }
        className={`${type == 'hot' ? "activeGameHeading" : ""
          } text-center  col-4  py-1 py-sm-2 `}
      >
        <img
          className="gameHeadingImg"
          src={type == "hot" ? hotActive : hotWhite}
        />
        <small className="fw-bold d-block  mt-2">{content?.game_type?.hot}</small>
      </div>
      <div
        className={`${type === "promotion" ? "activeGameHeading" : ""
          } text-center col-4  py-1 py-sm-2  `}
      >
        <Link to={"/promotion"}>
          <img className="gameHeadingImg" src={promotion} />
          <small className="fw-bold d-block  mt-2">{content?.nav?.promotion}</small>
        </Link>
      </div>
    </div>
  );
};

export default GameHeading;
