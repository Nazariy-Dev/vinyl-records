
import { Suspense } from 'react';
import Products from '../../components/products';
import Pagination from '../../components/pagination';
import { fetchProducts, fetchProductsPage } from '@/app/lib/data';
import { SearchParams } from '@/app/lib/definitions';
import ProductsWrapper from '../../components/products-wrapper';
import CardsSkeleton from '../../components/skeletons/cards';

import Title from '@/app/(general)/components/title';
import Sort from '../../(home)/sort';

export default async function Page({ searchParams }: SearchParams) {
    const genre = searchParams.genre || ''
    const query = searchParams.query || ''
    const genreName = searchParams.genreName || ''
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPage({ filters: { genre } })

    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <Title>{genreName}</Title>
                    <Sort />
                </div>
                <Suspense fallback={<CardsSkeleton />} key={genre + currentPage}>
                    <ProductsWrapper query={query} page={currentPage} genre={genre} />
                </Suspense>
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
        </>

    )
}
