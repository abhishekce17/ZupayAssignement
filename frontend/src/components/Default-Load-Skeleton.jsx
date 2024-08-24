import React from 'react'

export default function DefaultLoadSkeleton() {
    return (
        <div className='h-full flex flex-col justify-center items-center' >
            <div role="status" className="w-full max-w-md p-4 space-y-4 border rounded-xl shadow animate-pulse dark:divide-gray-300 md:p-6 dark:border-gray-300 bg-white">
                <div className="flex items-center justify-between">
                    <div className='w-full' >
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div className='w-full' >
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div className='w-full' >
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div className='w-full' >
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between pt-4">
                    <div className='w-full' >
                        <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-300"></div>
                    </div>
                </div>
                <div className='flex flex-col items-center' >
                    <div className="h-8 w-28 m-5 bg-gray-300 rounded-full dark:bg-gray-300"></div>
                </div>
            </div>
        </div>

    )
}
