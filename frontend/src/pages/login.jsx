import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("Hello");
    }

    return (
        <div className='flex items-center justify-center h-full' >
            <form onSubmit={handleSubmitForm} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                <div className='flex flex-col gap-1' >
                    <label htmlFor='email' >Email</label>
                    <input name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Password</label>
                    <input name='password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
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
    )
}
