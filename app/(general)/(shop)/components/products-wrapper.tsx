import { fetchProducts } from '@/app/lib/data'
import { SearchParams } from '@/app/lib/definitions'
import { IRecord } from '@/app/models/definitions/IRecord'
import React from 'react'
import Products from './products'

export default async function ProductsWrapper({ query, page, genre, sortingOption }: {
    query: string
    page: number
    genre?: string,
    sortingOption?: "priceDescending" | "priceAscending" | "dateAdded"
}) {
    const products: IRecord[] = JSON.parse(await fetchProducts({ currentPage: page, query, filters: { genre, sortingOption } }))

    return (
        <Products products={products} />
    )
}
