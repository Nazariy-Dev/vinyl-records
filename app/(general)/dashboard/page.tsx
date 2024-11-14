
import Title from '../components/title'
import AddProduct from './components/add-product'
import { fetchAuthors, fetchGenres, fetchProduct, fetchProducts, fetchUnits } from '@/app/lib/data';

import ProductList from './components/product-list';
import EditProduct from './components/edit-product';

import { IAuthor } from '@/app/models/definitions/IAuthor';
import { IUnits } from '@/app/models/definitions/IUnits';
import { IGenres } from '@/app/models/definitions/IGenres';
import { IRecord } from '@/app/models/definitions/IRecord';
import React, { Suspense, useRef } from 'react';
import DashboarWwrapper from './components/dashboard-wrapper';
import Sort from '../(shop)/(home)/sort';
import addAdmin from '@/app/lib/seed';
import { signOut } from '@/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons';


export interface SearchParams {
  searchParams: {
    genresQuery: string,
    authorQuery: string,
    addAuthorQuery: string,
    addGenreQuery: string
    page: string,
    productID: string,
    sortingOption?: "priceDescending" | "priceAscending" | "dateAdded"

  }
}


export default async function Dashboard({ searchParams }: SearchParams) {
  const genresQuery = searchParams.genresQuery || ''
  const authorQuery = searchParams.authorQuery || ''
  const productID = searchParams.productID || ''
  const sortingOption = searchParams.sortingOption


  const units: IUnits[] = JSON.parse(JSON.stringify((await fetchUnits())))
  const genres: IGenres[] = JSON.parse(JSON.stringify((await fetchGenres(genresQuery))))
  const authors: IAuthor[] = JSON.parse(JSON.stringify((await fetchAuthors(authorQuery))))
  const products: IRecord[] = JSON.parse(await fetchProducts({ currentPage: 1, query: '', filters: { sortingOption } }))
  const product: IRecord = JSON.parse(await fetchProduct(productID))


  return (
    <div className='container mx-auto p-5'>
      <DashboarWwrapper>
        <div className=' flex items-center justify-between'>
          <Title>Dashboard</Title>
          <details className="dropdown dropdown-end">
            <summary className="btn btn-md bg-transparent border-none ˝-none">
              <FontAwesomeIcon className='w-6 h-6' icon={faGear} />
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <form
                action={async () => {
                  'use server';
                  await signOut();
                }}
              >
                <button className='btn w-full'>
                  <div className='flex gap-2 items-center'>
                    <FontAwesomeIcon className='w-4 h-4' icon={faPowerOff} />
                    <div className="hidden md:block">Sign Out</div>
                  </div>
                </button>
              </form>
            </ul>
          </details>

        </div>
        <div className='flex justify-between'>
          <div className='flex gap-6 items-center' >
            <h2 className='font-semibold text-2xl'>Products catalogue</h2>
            <Sort className="select select-xs select-bordered w-full max-w-fit bg-secondary text-white font-semibold" />
            <AddProduct units={units} genres={genres} authors={authors} />

          </div>
        </div>
        <ProductList products={products} />
        {product && <EditProduct product={product} units={units} genres={genres} authors={authors} />}
      </DashboarWwrapper>
    </div>
  )
}
