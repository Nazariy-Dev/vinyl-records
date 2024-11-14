import React from 'react'
import NavLinks from './nav-links'


export default function SideNav() {
    
    return (
        <div className="flex text-base h-full flex-col py-4 px-2 overflow-hidden">
            <div className="flex gap-5 flex-col items-center overflow-auto">
                <NavLinks />
            </div>
        </div >
    )
}
