
import { Suspense } from 'react';
import Pagination from '../../components/pagination';
import { fetchProductsPage } from '@/app/lib/data';
import { SearchParams } from '@/app/lib/definitions';
import ProductsWrapper from '../../components/products-wrapper';
import CardsSkeleton from '../../components/skeletons/cards';
import Title from '@/app/(general)/components/title';
import Sort from '../../(home)/sort';

export default async function Page({ searchParams }: SearchParams) {
    const query = searchParams.query || ''
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchProductsPage({ query })
    const sortingOption = searchParams.sortingOption


    return (
        <>
            <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <Title>Searching: "{query}"</Title>
                    <Sort />
                </div>
                <Suspense fallback={<CardsSkeleton />} key={query + currentPage}>
                    <ProductsWrapper query={query} page={currentPage} sortingOption={sortingOption}/>
                </Suspense>
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </div>
        </>

    )
}
