import React, { PropsWithChildren } from 'react'
import Header from './components/header'
import SideNav from './components/sidenav'


export default function ShopLayout({ children }: PropsWithChildren) {

    return (
        <div className="flex h-screen flex-row overflow-hidden">
            <div className="lg:block hidden z-50 min-w-[236px] bg-[#171717] text-white ">
                <SideNav />
            </div>
            <Header />
            <div className="p-6 md:p-12 mt-20 flex-grow overflow-auto ">
                {children}
            </div>
        </div>
    )
}
