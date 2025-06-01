import React, { useContext } from 'react'
import { LanguageContext } from '../../contexts/LanguageContext';
import { Spinner } from 'react-bootstrap';
import { IoGameController } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';

export default function ProviderList({ providers, type }) {
    const { content } = useContext(LanguageContext);
    const { updateType, updateProvider } = useContext(GameContext);
    const navigate = useNavigate();

    return (
        <div className='row'>
            {providers && providers.length === 0 ? <p className='text-center'>{content?.no_data}</p> :
                providers && providers.map((item, index) => {
                    return <div key={index} className='cursor-pointer col-2 px-1 mb-4 '>
                        <div className='gameCardLg'>
                            <img src={item.img}
                                style={{ width: "100%" }}
                                className='img-fluid rounded-top-3' />
                            <div className="rounded-bottom-3 fw-semibold px-2 activeGameList text-black">
                                <h6
                                    className='pt-1 fw-semibold mb-0 text-white'
                                    width="100%"
                                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                >{item.name}</h6>
                                <div className="d-flex align-items-center gap-2">
                                    <IoGameController className='text-white' size={25} />
                                    <small className="fw-semibold text-white">{item.short_name}</small>
                                </div>
                            </div>
                            <div
                                className="gameCardLgBtn rounded-5 d-flex align-items-center justify-content-center shadow-lg"
                                onClick={() => {
                                    navigate(`/?type=${type?.id}&provider=${item.code}`);
                                    updateType(type.code);
                                    updateProvider(item.code);
                                }}
                            >
                                <p className="fw-semibold">{content?.btn?.go_to_list}</p>
                            </div>
                        </div>
                    </div>
                })}
        </div>
    )
}
