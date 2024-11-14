import React from 'react'

export default function Title({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className=' text-5xl font-bold mb-6'>{children}</div>
    )
}
