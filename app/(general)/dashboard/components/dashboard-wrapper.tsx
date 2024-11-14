'use client'

import React, { MutableRefObject, PropsWithChildren, useRef } from 'react'

type DrawerContextType = MutableRefObject<HTMLInputElement | null> | null;

export const Context = React.createContext<DrawerContextType>(null)

export default function DashboarWwrapper({ children }: PropsWithChildren) {
    const drawer = useRef<HTMLInputElement>(null);
    
    return (
        <Context.Provider value={drawer}>
            <div>{children}</div>
        </Context.Provider>
    )
}
