import React, { useState } from 'react'
import Button from '../components/Button';
import { notify } from '../utils/notify';
import { useCookies } from 'react-cookie';

export default function AccountSetting() {
    const [disabled, setDisabled] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const [cookies] = useCookies("authToken")

    const [userInfo, setUserInfo] = useState({
        name: "", //get user info from recoil store
        email: "",
        username: ""
    })

    const [passwords, setPassword] = useState({ password: "", "confirm-password": "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...passwords, [name]: value });
    }

    const handleSubmitUserInfo = async (e) => {
        e.preventDefault();
        const request = await fetch("http://localhost:5000/api/v1/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.authToken}`
            },
            body: JSON.stringify({ userInfo })
        })
        if (request.status === 200) {
            notify("Updated Successfully", "success");
        } else {
            const { error } = await request.json();
            notify(error, "error");
        }
    }

    const handleSubmitPassword = async () => {
        const request = await fetch("http://localhost:5000/api/v1/user/password-change", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ passwords })
        })
        if (request.status === 200) {
            notify("Password Changed", "success");
        } else {
            const { error } = await request.json();
            notify(error, "error")
        }
    }

    return (
        <div className='flex items-center justify-center h-full' >
            <form onSubmit={handleSubmitUserInfo} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                <div className='flex flex-col gap-1' >
                    <label htmlFor='name' >Name</label>
                    <input onChange={handleChange} disabled={disabled} name='name' id='name' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"Abhishek"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='username' >Username</label>
                    <input onChange={handleChange} disabled={disabled} name='username' id='username' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"abhi@pro"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='email' >Email</label>
                    <input onChange={handleChange} disabled={disabled} name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" value={"abhisheklprajapati18@gmail.com"} required />
                </div>
                <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Password</label>
                    <input onChange={handlePasswordChange} disabled={!changePassword} name='password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded disabled:bg-white" value={";alkdjaoealk"} required />
                </div>
                {changePassword ? <div className='flex flex-col gap-1' >
                    <label htmlFor='password' >Confirm Password</label>
                    <input onChange={handlePasswordChange} disabled={!changePassword} name='confirm-password' id='password' type="password" className="bg-custom-lightest-gray outline-none p-1 rounded disabled:bg-white" value={";alkdjaoealk"} required />
                </div> : undefined}
                <div className='flex justify-center gap-3' >
                    <Button>
                        <button onClick={() => setDisabled((prev => !prev))} type={!disabled ? "button" : "submit"} >
                            {disabled ? "Edit" : "Save"}
                        </button>
                    </Button>
                    <Button>
                        <button name="password-change"
                            onClick={() => {
                                if (changePassword) {
                                    handleSubmitPassword()
                                }
                                setChangePassword((prev => !prev));
                            }}
                            type="button" >
                            {changePassword ? "Save Password" : "Change Password"}
                        </button>
                    </Button>
                </div>
            </form>
        </div>
    )
}
