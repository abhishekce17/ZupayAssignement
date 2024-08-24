import React from 'react'
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function Register() {
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log("Hello");
    }

    return (
        <div className='flex items-center justify-center h-full' >
            <form onSubmit={handleSubmitForm} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                <div className='flex flex-col gap-1' >
                    <label htmlFor='name' >Name</label>
                    <input name='name' id='name' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='username' >Username</label>
                    <input name='username' id='username' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='email' >Email</label>
                    <input name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Password</label>
                    <input name='password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='confirm-password' >Confirm password</label>
                    <input name='confirm-password' id='confirm-password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded" required />
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
    )
}
