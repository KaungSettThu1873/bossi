import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../contexts/LanguageContext';
import { Spinner } from 'react-bootstrap';
import { IoGameController } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { GameContext } from '../../contexts/GameContext';
import BASE_URL from '../../hooks/baseUrl';

export default function ProviderList({ typeCode, type }) {
    const { content } = useContext(LanguageContext);
    const { updateType, updateProvider } = useContext(GameContext);
    const navigate = useNavigate();

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (typeCode) {
            setLoading(true);
            fetch(`${BASE_URL}/providers/${typeCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProviders(data.data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching providers:', error);
                setLoading(false);
            });
        }
    }, [typeCode]);

    if (loading) return <Spinner animation="border" />;

    return (
        <div className='scroll-row d-flex overflow-auto px-2'>
            {providers.length === 0 ? (
                <p className='text-center'>{content?.no_data}</p>
            ) : (
                providers.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer  mb-4 px-2 " 
                    >
                        <div className="gold-card rounded-4  ">
                            <img
                                src={"https://luckymillion.pro/api/.." + item.img_url}
                                className="  card-ratio  "
                                style={{
                                    borderTopLeftRadius: "1rem",
                                    borderTopRightRadius: "1rem",
                                    border: "none"
                                }}
                            />
                            <div
                                className="px-3 py-2 mt-1 text-center"
                                style={{
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    color: "#fff",
                                      overflow: "hidden !important",
                                      borderRadius: "200px"
                                }}
                            >
                                <h6
                                    className="mb-1"
                                    style={{
                                        whiteSpace: "nowrap",
                                        overflow: "hidden !important",
                                        textOverflow: "ellipsis",
                                        fontSize: "13px",
                                        
                                    }}
                                >
                                    {item.product_name}
                                </h6>
                                {/* <div className="d-flex align-items-center gap-2">
                                    <small className="fw-medium text-white">{item.short_name}</small>
                                </div> */}
                            </div>
                            <div
                                className="gameCardLgBtn position-absolute bottom-0 start-50 translate-middle-x mb-2 px-3 py-1 rounded-pill shadow"
                                style={{
                                    background: "linear-gradient(90deg, #FFD700, #FFA500)",
                                    color: "#000",
                                    fontWeight: "600",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    navigate(`/?type=${type?.id}&provider=${item.id}`);
                                    updateType(type.id);
                                    updateProvider(item.id);
                                }}
                            >
                                {content?.btn?.go_to_list}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
