'use client'

import React, { useContext } from 'react'
import NavLinks from './nav-links'
import { SideNavContext } from './layout-wrapper'
import { IGenres } from '@/app/models/definitions/IGenres'



export default function SideNav({ genres }: { genres: IGenres[] | undefined }) {
    const { ref, sideNavVisible } = useContext(SideNavContext)

    return (

        // bg
        <div className={"bg-black bg-opacity-20 z-50 fixed transition-all  w-screen h-screen md:max-w-[236px] md:opacity-100  md:visible md:static " + (sideNavVisible ? " " : " opacity-0 invisible") }>
            
            <div ref={ref} className={"md:static md:transform-none fixed min-w-[236px] list-none flex gap-5 flex-col items-center overflow-auto text-base h-full py-4 px-2  bg-[#171717] text-white transition-all " + (sideNavVisible ? "  -translate-x-0" : " -translate-x-full")}>
                <NavLinks genres={genres} />
            </div>

        </div>
    )
}
