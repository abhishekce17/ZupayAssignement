import React, { useState } from 'react'
import Button from '../components/Button';
import { notify } from '../utils/notify';
import { useCookies } from 'react-cookie';
import { RedirecToLogin } from '../components/Authorization';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../stores/atoms/user';

export default function AccountSetting() {
    const [disabled, setDisabled] = useState(true);
    const [cookies] = useCookies("authToken")
    const userAtomInfo = useRecoilValue(userAtom);

    const [userInfo, setUserInfo] = useState({
        name: userAtomInfo.name, //get user info from recoil store
        email: userAtomInfo.email,
        username: userAtomInfo.username
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    }

    const handleSubmitUserInfo = async (e) => {
        e.preventDefault();
        const request = await fetch("http://localhost:5000/api/v1/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.authToken}`
            },
            body: JSON.stringify({ ...userInfo })
        })
        if (request.status === 200) {
            notify("Updated Successfully", "success");
        } else {
            const { error } = await request.json();
            notify(error, "error");
        }
    }

    return (
        <RedirecToLogin>
            <div className='flex items-center justify-center h-full' >
                <form onSubmit={handleSubmitUserInfo} className="bg-white rounded-xl flex flex-col gap-5 max-h-max p-8 pl-5 pr-5 flex-grow max-w-md" >
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='name' >Name</label>
                        <input onChange={handleChange} disabled={disabled} name='name' id='name' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={userInfo.name} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='username' >Username</label>
                        <input onChange={handleChange} disabled={disabled} name='username' id='username' type="text" className="bg-custom-lightest-gray outline-none p-1 rounded" value={userInfo.username} required />
                    </div>
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='email' >Email</label>
                        <input onChange={handleChange} disabled={disabled} name='email' id='email' type="email" className="bg-custom-lightest-gray outline-none p-1 rounded" value={userInfo.email} required />
                    </div>
                    <div className='flex justify-center gap-3' >
                        <Button>
                            <button onClick={() => setDisabled((prev => !prev))} type={!disabled ? "button" : "submit"} >
                                {disabled ? "Edit" : "Save"}
                            </button>
                        </Button>
                    </div>
                </form>
            </div>
        </RedirecToLogin>
    )
}
