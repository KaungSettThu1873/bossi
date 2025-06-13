import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const useLogin = () => {
    const [error, setError] = useState();
    const [errMsg, setErrMsg] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (url, inputData) => {
        setLoading(true);
        try {
            const res = await axios.post(url, inputData);
            if (res.status === 200) {
                setError();
                setLoading(false);
                localStorage.setItem('token', res.data.data.token);
                // if(res.data.data.user.role === 'system' || res.data.data.user.role === 'admin') {
                //     navigate('/admin')
                // } else {
                //     navigate('/');
                // }
                navigate('/?type=all');
                window.location.reload()
                message.success('Logged In Successfully.');
                return res.data.data.user;
            }
        } catch (e) {
            setLoading(false);
            setError(e.response.data.errors);
            setErrMsg(e.response.data.message);
            return;
        }
        return null;
    };

    return { login, error, errMsg, loading };
};

export default useLogin;
