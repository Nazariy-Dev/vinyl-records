import React from 'react'
import SectionHeader from '../../components/SectionHeader'


export default function ListenSections({iframeLink}: {iframeLink: string}) {
    return (
        <div className='bg-accent -mx-6 md:-mx-12 px-6 py-6 md:px-12'>
            <SectionHeader>
                <div className='text-secondary'>Listen</div>
            </SectionHeader>
            <iframe className='rounded-md ' src={iframeLink} width="50%" height="352" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
    )
}
