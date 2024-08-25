import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

export function RedirecToLogin({ children }) {
    const [cookies] = useCookies(["authToken"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!cookies.authToken) {
            navigate("/login");
        }
    }, [])
    return (
        <>
            {
                !cookies.authToken ? navigate("/login") :
                    <>{children}</>
            }
        </>
    )
}

export function RedirecToHome({ children }) {
    const [cookies] = useCookies(["authToken"]);
    const navigate = useNavigate();
    useEffect(() => {
        if (cookies.authToken) {
            navigate("/");
        }
    }, [])
    return (
        <>
            {
                cookies.authToken ? navigate("/") :
                    <>{children}</>
            }
        </>
    )
}



