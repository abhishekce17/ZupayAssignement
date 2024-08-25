import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { notify } from '../utils/notify';
import { useCookies } from 'react-cookie'
import { RedirecToHome } from '../components/Authorization';

export default function Login() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['authToken']);
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInput({ ...loginInput, [name]: value });
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const request = await fetch("http://localhost:5000/api/v1/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...loginInput })
        })
        if (request.status === 200) {
            const data = await request.json();
            //store user info
            setCookie("authToken", data, { path: "/", sameSite: "strict" });
            navigate("/");
        } else {
            const error = await request.json();
            notify(error, "error");
        }
    }

    return (
        <RedirecToHome>
            <div className='flex items-center justify-center h-full' >
                <form onSubmit={handleSubmitForm} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='email' >Email</label>
                        <input onChange={handleChange} name='email' id='email' type="email" value={loginInput.email} className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='password' >Password</label>
                        <input onChange={handleChange} name='password' id='password' type="password" value={loginInput.password} className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                    </div>
                    <div className='flex justify-center' >
                        <Button>
                            <button type="submit" >
                                Login
                            </button>
                        </Button>
                    </div>
                    <div className="text-center" >
                        Don't have account, click here to
                        <Link to="/register" className=" text-primary" > Register</Link>
                    </div>
                </form>
            </div>
        </RedirecToHome>
    )
}
