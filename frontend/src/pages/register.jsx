import React, { useState } from 'react'
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify';
import { useCookies } from 'react-cookie';
import { RedirecToHome } from '../components/Authorization';

export default function Register() {
    const [, setCookie] = useCookies(['authToken']);
    const navigate = useNavigate();
    const [registerInput, setRegisterInput] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "confirm-password") {
            setConfirmPassword(value);
        } else {
            setRegisterInput(prev => {
                return { ...prev, [name]: value };
            })
        }
    }

    const handleSubmitForm = async (e) => {
        if (registerInput.password !== confirmPassword) {
            notify("Password is not match", "success");
        } else {
            e.preventDefault();
            const request = await fetch("http://localhost:5000/api/v1/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...registerInput })
            })
            if (request.status === 200) {
                const data = await request.json();
                //store user info
                setCookie("authToken", data, { path: "/", sameSite: "strict", httpOnly: "true" });
                navigate("/");
            } else {
                const { error } = await request.json();
                notify(error, "error");
            }
        }
    }

    return (
        <RedirecToHome>

            <div className='flex items-center justify-center h-full' >
                <form onSubmit={handleSubmitForm} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='name' >Name</label>
                        <input onChange={handleChange} name='name' id='name' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={registerInput.name} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='username' >Username</label>
                        <input onChange={handleChange} name='username' id='username' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={registerInput.username} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='email' >Email</label>
                        <input onChange={handleChange} name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" value={registerInput.email} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='password' >Password</label>
                        <input onChange={handleChange} name='password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded" value={registerInput.password} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='confirm-password' >Confirm password</label>
                        <input onChange={handleChange} name='confirm-password' id='confirm-password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded" value={confirmPassword} required />
                    </div>
                    <div className='flex justify-center' >
                        <Button>
                            <button type="submit" >
                                Register
                            </button>
                        </Button>
                    </div>
                    <div className="text-center" >
                        Already have account, login here
                        <Link to="/login" className=" text-primary" > Login</Link>
                    </div>
                </form>
            </div>
        </RedirecToHome>
    )
}
