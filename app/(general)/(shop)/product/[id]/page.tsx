import { fetchProduct } from '@/app/lib/data'
import React from 'react'
import OverviewSection from './sections/overview-section';
import SongsSectons from './sections/songs-sectons';
import ListenSections from './sections/listen-sections';

interface ProductPageProps {
    params: {
        id: string
    }
}

export default async function ProductPage({ params: { id } }: ProductPageProps) {
    const product = JSON.parse(await fetchProduct(id));

    return (
        <div>
            {product &&
                <>
                    <OverviewSection product={product} />
                    <SongsSectons songs={product.songs} />
                    <ListenSections iframeLink={product.iFramelink} />
                </>}
        </div>
    )
}
