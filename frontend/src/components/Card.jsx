import React from 'react'
import { Link } from 'react-router-dom'

export default function Card({ title, src, date, time, href, editIcon, deleteIcon }) {
    return (
        <div className='card bg-white h-fit max-h-max rounded-xl overflow-hidden'>
            <Link to={href} >
                <div className=' aspect-video overflow-hidden' >
                    <img className='' src={src} />
                </div>
                <div className='p-2 text-lg' >
                    <label>{title}</label>
                    <div className='flex justify-between text-custom-light-gray text-sm' ><span>{date}</span> <span>{time}</span></div>
                </div>
            </Link>{
                (editIcon && deleteIcon) ?
                    <div className='flex gap-5 p-2' >{editIcon}{deleteIcon}</div>
                    : undefined
            }

        </div>
    )
}
