import React, { useState } from 'react'
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function AccountSetting() {
    const [disabled, setDisabled] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(e.target)
        console.log(changePassword);
        console.log("Hello");
    }

    return (
        <div className='flex items-center justify-center h-full' >
            <form onSubmit={handleSubmitForm} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                <div className='flex flex-col gap-1' >
                    <label htmlFor='name' >Name</label>
                    <input disabled={disabled} name='name' id='name' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"Abhishek"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='username' >Username</label>
                    <input disabled={disabled} name='username' id='username' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"abhi@pro"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='email' >Email</label>
                    <input disabled={disabled} name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"abhisheklprajapati18@gmail.com"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Password</label>
                    <input disabled={!changePassword} name='password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded disabled:bg-white" value={";alkdjaoealk"} required />
                </div>
                {changePassword ? <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Confirm Password</label>
                    <input disabled={!changePassword} name='confirm-password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded disabled:bg-white" value={";alkdjaoealk"} required />
                </div> : undefined}
                <div className='flex justify-center gap-3' >
                    <Button>
                        <button onClick={() => setDisabled((prev => !prev))} type={!disabled ? "button" : "submit"} >
                            {disabled ? "Edit" : "Save"}
                        </button>
                    </Button>
                    <Button>
                        <button name="password-change" onClick={() => setChangePassword((prev => !prev))} type="button" >
                            {changePassword ? "Save Password" : "Change Password"}
                        </button>
                    </Button>
                </div>
            </form>
        </div>
    )
}
