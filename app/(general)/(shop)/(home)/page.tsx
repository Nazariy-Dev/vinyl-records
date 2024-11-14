
import { fetchProducts, fetchProductsPage } from "@/app/lib/data";
import Title from "../../components/title";
import Products from "../components/products";
import Pagination from "../components/pagination";
import { Suspense } from "react";
import { IRecord } from "@/app/models/definitions/IRecord";
import { SearchParams } from "@/app/lib/definitions";
import CardsSkeleton from "../components/skeletons/cards";
import ProductsWrapper from "../components/products-wrapper";
import Sort from "./sort";


export default async function Page({ searchParams }: SearchParams) {
  const query = searchParams.query || ''
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPage({query})
  const sortingOption = searchParams.sortingOption


  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <Title>Popular relaeses</Title>
        <Sort />
      </div>
      <div className="flex flex-col ">
        <Suspense fallback={<CardsSkeleton />} key={query + currentPage}>
          <ProductsWrapper query={query} page={currentPage} sortingOption={sortingOption}/>
        </Suspense>
        {totalPages > 1 &&
          <Pagination totalPages={totalPages} />
        }
      </div>
    </>
  );
}
