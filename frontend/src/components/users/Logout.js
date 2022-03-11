import useAuth from './hooks/useAuth';
import { useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
const LOGOUT_URL = '/logout';

const Logout = () => {

    const { setAuth } = useAuth();
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();
    const errRef = useRef();

    const clickLogout = (e) => {
        try {
            const response = axios.get(LOGOUT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            console.log(JSON.stringify(response?.data));
            setAuth({});
            navigate('/', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            errRef.current.focus();
        }
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <button onClick={clickLogout}>Logout</button>
        </section>
    )
}

export default Logout