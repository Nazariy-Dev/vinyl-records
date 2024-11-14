'use client'

import React, { MutableRefObject, PropsWithChildren, useRef } from 'react'

export const Context = React.createContext<MutableRefObject<HTMLInputElement | null>>(null)

export default function DashboarWwrapper({ children }: PropsWithChildren) {
    const drawer = useRef<HTMLInputElement | null>(null);
    
    return (
        <Context.Provider value={drawer}>
            <div>{children}</div>
        </Context.Provider>
    )
}
