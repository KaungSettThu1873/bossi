import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import GameHeading from '../components/mobile/GameHeading';
import GameLists from '../components/mobile/GameLists';
import ProviderList from '../components/mobile/ProviderList';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseUrl';
import { LanguageContext } from '../contexts/LanguageContext';
import { Spinner } from 'react-bootstrap';
import launchGame from '../hooks/LaunchGame';
import shan from '../assets/img/shan.jpg';
import ponewine from "../assets/img/ponewine.jpg"
import { AuthContext } from '../contexts/AuthContext';
import { GameContext } from '../contexts/GameContext';

const GamesPage = () => {
    const { user } = useContext(AuthContext);
    const { content } = useContext(LanguageContext);
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const tab = searchParams.get('tab');
    const provider = searchParams.get('provider');
    const navigate = useNavigate();
    const { game_lists, hot_games, types, provider_name, type_name, table_games, card_games, bingo_games } = useContext(GameContext);
    const { data: game_types, loading } = useFetch(`${BASE_URL}/game_types`, { method: 'GET' });


    const renderProviders = () => {
        if (tab == 'all') {
            return (
                <>
                    <div className='mb-4'>
                        <h5 className='mb-3'>{content?.game_type?.burmese}</h5>
                        <div className="d-flex align-items-center gap-3">
                            <Link to={`https://goldendragon7.pro/?user_name=${user?.user_name}&balance=${user?.balance}`} target='_blank'>
                                <img src={shan} width={100} className='rounded' alt="" />
                            </Link>
                            <Link to={`https://ponewine20x.netlify.app/?user_name=${user?.user_name}&balance=${user?.balance}`} target='_blank'>
                                <img src={ponewine} width={100} className='rounded' alt="" />
                            </Link>
                        </div>
                    </div>
                    {game_types && game_types.map((item, index) => (
                        <div key={index} className="mb-4">
                            <h5 className="mb-4">{item.name}</h5>
                            <ProviderList
                                loading={loading}
                                providers={item.providers}
                                type={item.code}
                            />
                        </div>
                    ))}

                </>
            );
        }
        return null;
    };

    const renderGames = () => {
        return loading ? (
            <>
                <Spinner />
            </>
        ) : game_lists?.length == 0 ? (
            <>
                <h5 className="text-center">
                    {content?.no_data}
                </h5>
            </>
        ) : game_lists?.map((item, index) => (
            <div
                key={index}
                className="p-0 mt-2 cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 mb-sm-3"
                onClick={launchGame(item.type_id, item.provider_code, item.code)}
            >
                <img src={item.img} className="gameImg rounded-3" alt="Game" />
            </div>
        ));
    };

    const renderGameLists = (game_lists) => {
        return loading ? (
            <>
                <Spinner />
            </>
        ) : game_lists?.length == 0 ? (
            <>
                <h5 className="text-center">
                    {content?.no_data}
                </h5>
            </>
        ) : game_lists?.map((item, index) => (
            <div
                key={index}
                className="p-0 mt-4 cursor-pointer col-4 col-sm-3 col-lg-2 mb-2 mb-sm-3"
                onClick={launchGame(item.type_id, item.provider_code, item.code)}
            >
                <img src={item.img} className="gameImg rounded-3" alt="Game" />
            </div>
        ));
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <GameHeading />
            <GameLists />
            <div className="">
                <div className="d-flex justify-content-between px-2">
                    <h6 className="fw-bold text-white ms-2">
                        {type !== 'all' && type_name}
                    </h6>
                    <h6>{provider !== 'undefined' ? provider_name : ''}</h6>
                </div>
                <div className="row mb-5 px-4 pb-5">
                    {tab == "all" && (
                        renderProviders()
                    )}
                    {(type !== "all" && type) && (
                        <>
                            {renderGames()}
                        </>
                    )}
                    {tab == "hot" && (
                        <>
                        <h5>Hot Games</h5>
                        {renderGameLists(hot_games)}
                        </>
                    )}
                    {tab == "table" && (
                        <>
                        <h5>Table Games</h5>
                        {renderGameLists(table_games)}
                        </>
                    )}
                    {tab == "card" && (
                        <>
                        <h5>Card Games</h5>
                        {renderGameLists(card_games)}
                        </>
                    )}
                    {tab == "bingo" && (
                        <>
                        <h5>Bingo Games</h5>
                        {renderGameLists(bingo_games)}
                        </>
                    )}
                    {/* {tab === "fishing" && renderGameLists(fishgames)} */}
                </div>
            </div>
        </div >
    );
};

export default GamesPage;