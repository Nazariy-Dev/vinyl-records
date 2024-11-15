import React, { MutableRefObject, PropsWithChildren, useRef } from 'react'
import Header from './components/header'
import SideNav from './components/sidenav'
import LayoutWrapper from './components/layout-wrapper'
import { fetchGenres } from '@/app/lib/data'



export default async function ShopLayout({ children }: PropsWithChildren) {
    const genres = await fetchGenres('')

    return (
        <LayoutWrapper>
            <div className="flex h-screen flex-row overflow-hidden">
                    <SideNav genres={genres} />
                <Header />
                <div className="p-6 md:p-12 mt-20 flex-grow overflow-auto ">
                    {children}
                </div>
            </div>
        </LayoutWrapper>
    )
}
