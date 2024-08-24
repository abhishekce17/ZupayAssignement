import React from 'react'

export default function AllPostLayout({ children }) {
    return (
        <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-6 row-auto" >
            {children}
        </div>
    )
}
