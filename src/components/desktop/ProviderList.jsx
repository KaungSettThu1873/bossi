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
    'Accept': 'application/json'
  }
}) 
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then(data => {
                    console.log('Fetched providers data:', data);
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
        <div className='row'>
            {providers.length === 0 ? (
                <p className='text-center'>{content?.no_data}</p>
            ) : (
                providers.map((item, index) => (
                    <div key={index} className='cursor-pointer col-lg-1 col-md-2 col-sm-4 col-6 mb-4'>
                        <div className='gameCardLg mb-2'>
                            <img src={"https://luckymillion.pro/api/.."+item.img_url}  className='img-fluid rounded-top-3 rounded-4 providerDesign' />
                            <div className="rounded-bottom-3 fw-semibold px-2 activeGameList text-black">
                                <h6 className='pt-lg-2 pt-md-2 pt-1  mb-0 text-white' style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' , fontSize: '13px' }}>
                                    {item.product_name}
                                </h6>
                                <div className="d-flex align-items-center gap-2">
                                    {/* <IoGameController className='text-white' size={25} /> */}
                                    <small className="fw-semibold text-white">{item.short_name}</small>
                                </div>
                            </div>
                            <div className="gameCardLgBtn rounded-5 d-flex align-items-center justify-content-center shadow-lg"
                                onClick={() => {
                                    navigate(`/?type=${type?.id}&provider=${item.code}`);
                                    updateType(type.code);
                                    updateProvider(item.code);
                                }}>
                                <p className="fw-semibold">{content?.btn?.go_to_list}</p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
