import clsx from 'clsx'
import React, { PropsWithChildren, ReactNode } from 'react'

interface SectionHeaderProps {
    children: ReactNode,
}

export default function SectionHeader({ children }: SectionHeaderProps) {
    return (
        <div className={'text-3xl font-semibold mb-8'}>{children}</div>
    )
}
