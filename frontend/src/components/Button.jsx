import React from 'react'

export default function Button({ children }) {
    return (
        <div className="text-white pr-3 pl-3 pb-1 pt-1 rounded-2xl bg-primary h-auto max-w-max" >{children}</div>
    )
}
