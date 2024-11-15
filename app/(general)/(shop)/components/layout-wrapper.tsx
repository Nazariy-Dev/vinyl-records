'use client'

import useOutsideSideNavClick from '@/app/lib/hooks/useOutsideClick';
import React, { Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, useRef, useState } from 'react'
import { any } from 'zod';

interface SideNavContextType {
    ref: MutableRefObject<HTMLInputElement | null> | null
    sideNavVisible: boolean
    setSideNavVisible: any
};
export const SideNavContext = React.createContext<SideNavContextType>({
    ref: null,
    sideNavVisible: false,
    setSideNavVisible: null
})


export default function LayoutWrapper({ children }: PropsWithChildren) {
    const sideNavRef = useRef<HTMLInputElement>(null);
    const [sideNavVisible, setSideNavVisible] = useState(false)

    useOutsideSideNavClick(sideNavRef, sideNavVisible, () => {
        if (sideNavVisible) setSideNavVisible(false)
    })


    return (
        <SideNavContext.Provider value={{ ref: sideNavRef, sideNavVisible: sideNavVisible, setSideNavVisible: setSideNavVisible }}>
            <div>{children}</div>
        </SideNavContext.Provider>

    )
}
