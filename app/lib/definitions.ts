import Stripe from "stripe";

export interface Product extends Stripe.Price {
  id: string,
  unit_amount: number | null,
  product: ProductInfo
}

interface ProductInfo extends Stripe.Product {
  name: string,
}

export interface SearchParams {
  searchParams: {
    query: string
    page: number,
    genre: string,
    genreName: string;
    sortingOption?: "priceDescending" | "priceAscending" | "dateAdded"
  }
}
export interface LineItems {
  price: string,
  quantity: number
}

export interface IAddRecordRequest {
  name: string,
  author: string,
  image: string | ArrayBuffer | null,
  unitsInAlbum: string
  genres: string[],
  releaseDate: string,
  songs?: string[] | undefined,
  price: number,
  iFramelink: string,
  quantity: number
}
export interface IEditRecordRequest extends IAddRecordRequest {
  _id: string,
  productId: string
}
