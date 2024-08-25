import React from 'react'

export default function TagLayout({ selected, children }) {
    return (
        <div className={` pr-3 pl-3 pb-1 pt-1 rounded-2xl ${selected ? "text-white bg-primary" : "text-custom-dark-gray bg-fuchsia-200"} h-auto max-w-max`} >{children}</div>
    )
}
