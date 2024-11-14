import React from 'react'

export default function CardsSkeleton() {
    return (
        <>
            <div className="skeleton h-10 w-72 mb-10"></div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-8 flex-1'>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
                <div className="flex w-full h-full flex-col gap-4">
                    <div className="skeleton h-80 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            </div>
        </>
    )
}
