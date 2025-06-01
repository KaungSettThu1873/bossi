import React, { useContext } from 'react'
import launchGame from "../../hooks/LaunchGame";
import { LanguageContext } from '../../contexts/LanguageContext';
import { Spinner } from 'react-bootstrap';
import { IoGameController } from 'react-icons/io5'
import { GameContext } from '../../contexts/GameContext';

export default function GameList({ loading, games }) {
    const { content } = useContext(LanguageContext);
    const { provider_name } = useContext(GameContext);
    
    return (
        <>
        <h5>{provider_name}</h5>
            {loading ? <Spinner /> : games && games.length === 0 ? <p className='text-center'>{content?.no_data}</p> :
                games && games.map((item, index) => {
                    return <div key={index} className='cursor-pointer col-2 px-1 mb-4 '>
                        <div className='gameCardLg'>
                            <img src={item.img}
                                style={{ height: '150px', width: "100%" }}
                                className='img-fluid rounded-top-3' />
                            <div className="rounded-bottom-3 fw-semibold px-2 activeGameList text-black">
                                <small
                                    className='py-1 d-block fw-semibold mb-0 text-white'
                                    width="100%"
                                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                >
                                    {item.name}
                                    {/* {item.provider_code} */}
                                </small>
                            </div>
                            <div
                                className="gameCardLgBtn rounded-5 d-flex align-items-center justify-content-center shadow-lg"
                                onClick={launchGame(item.type_id, item.provider_code, item.code)}
                            >
                                <p className="fw-semibold">{content?.btn?.play_game}</p>
                            </div>
                        </div>
                    </div>
                })}
        </>
    )
}
