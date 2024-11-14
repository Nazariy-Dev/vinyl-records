import Stripe from "stripe";
import { LineItems } from "./definitions";
import { IUnits } from "../models/definitions/IUnits";
import { IGenres } from "../models/definitions/IGenres";
import UnitsModel from "../models/unitsModel";
import GenreModel from "../models/genreModel";
import AuthorModel from "../models/authorModel";
import RecordModel from "../models/recordModel";
import { IRecord } from "../models/definitions/IRecord";
import { IAuthor } from "../models/definitions/IAuthor";
import dbConnect from "./db";


const ITEMS_PER_PAGE = 6;

// export async function getProducts(cursor: string, position: "first" | "last"): Promise<Stripe.Product[]> {
//     try {
//         const res = await stripe.products.list({
//             expand: ['data.default_price'],
//             ...(position == "last" ? { starting_after: cursor || undefined } : { ending_before: cursor || undefined }),
//             limit: ITEMS_PER_PAGE,
//         })

//         const products: Stripe.Product[] = res.data
//         return products

//     } catch (error: any) {
//         return error
//     }
// }

// export async function getFilteredProducts({ query, cursor, position, genre }: { query?: string, cursor?: string, position?: "first" | "last", genre?: string }): Promise<IRecord[]> {
//     try {
//         let res;
//         if (query || genre) {
//             res = await stripe.products.search({
//                 ...(query ? { query: `name~"${query}"` } : { query: `metadata["genre"]:"${genre}"` }),
//                 expand: ['data.default_price'],
//                 limit: ITEMS_PER_PAGE
//             })
//         } else {
//             res = await stripe.products.list({
//                 expand: ['data.default_price'],
//                 ...(position == "last" ? { starting_after: cursor || undefined } : { ending_before: cursor || undefined }),
//                 limit: ITEMS_PER_PAGE,
//             })
//         }
//         const products: IRecord[] = RecordModel.find({})

//         return products
//     } catch (error: any) {
//         return error
//     }
// }

// export async function getProductsPages({ query, genre }: { query?: string, genre?: string }): Promise<number> {
//     let length = 0;
//     if (query || genre) {
//         for await (const _ of stripe.products.search({ limit: 100, ...(query ? { query: `name~"${query}"` } : { query: `metadata["genre"]:"${genre}"` }) })) {
//             length++
//         }
//     } else {
//         for await (const _ of stripe.products.list({ limit: 100 })) {
//             length++
//         }
//     }


//     const totalPages = Math.ceil(length / ITEMS_PER_PAGE)

//     return totalPages
// }

export async function checkout(lineItems: LineItems[]) {
    const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lineItems })
    })

    const data = await res.json()
    return data
}

export async function fetchProduct(id: string): Promise<string> {
    await dbConnect()


    if (!id)
        return JSON.stringify("")
    try {
        const product: IRecord | null = await RecordModel
            .findOne({ _id: id })
            .populate("genres", "name")
            .populate("author", "name")
            .populate("unitsInAlbum", "name")
        return JSON.stringify(product!)
    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }
}

export async function fetchUnits() {
    await dbConnect()

    const units: IUnits[] = await UnitsModel.find({})
    return units
}

export async function fetchGenres(genresQuery: string) {
    await dbConnect()

    try {
        // if (genresQuery) {
        const genres: IGenres[] = await GenreModel.find({ name: { $regex: genresQuery, $options: 'i' } })
        return genres
        // } else {
        //     return []
        // }
    } catch (error) {
        console.log(error)
    }
}

export async function fetchAuthors(authorsQuery: string) {
    await dbConnect()

    try {
        if (authorsQuery) {
            const authors: IGenres[] = await AuthorModel.find({ name: { $regex: authorsQuery, $options: 'i' } })
            return authors
        } else {
            return []
        }
    } catch (error) {
        console.log(error)
    }
}

export async function fetchProductsPage({ query, filters }: { query?: string, filters?: { genre: string } }): Promise<number> {
    await dbConnect()
    
    let productsQuery: any = {};

    if (query) {
        const author: IAuthor | null = await AuthorModel.findOne({ name: { $regex: query, $options: 'i' } })
        productsQuery.$or = [{ name: { $regex: query, $options: 'i' } }, { author: author?._id }]
    }
    // debugger

    if (filters && filters.genre) {
        const genresID = filters?.genre.split("|");
        productsQuery.genres = { $in: genresID }
    }


    const totalProduct = await RecordModel.find(productsQuery)
    const totalPages = Math.ceil(totalProduct.length / ITEMS_PER_PAGE)

    return totalPages
}

export async function fetchProducts({ currentPage, query, filters }:
    {
        currentPage: number,
        query: string,
        filters: {
            genre?: string
            sortingOption?: "priceDescending" | "priceAscending" | "dateAdded"
        }
    }) {
    await dbConnect()


    let productsQuery: any = {};
    let productsSort: any = {};

    if (query) {
        const author: IAuthor | null = await AuthorModel.findOne({ name: { $regex: query, $options: 'i' } })
        productsQuery.$or = [{ name: { $regex: query, $options: 'i' } }, { author: author?._id }]
    }

    if (filters && filters.genre) {
        const genresID = filters?.genre?.split("|");
        productsQuery.genres = { $in: genresID }
    }

    if (filters && filters.sortingOption) {
        switch (filters.sortingOption) {
            case "priceDescending":
                productsSort.price = -1
                break
            case "priceAscending":
                productsSort.price = 1
                break
            case "dateAdded":
                productsSort.createdAt = -1 
                break
            
            default: 
                productsSort.createdAt = -1 
        }
    }


    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const products = await RecordModel
            .find(productsQuery)
            .skip(offset)
            .limit(ITEMS_PER_PAGE)
            .sort(productsSort)
            .populate("author", "name")
            .populate("unitsInAlbum", "name")
            .populate("genres", "name")


        return JSON.stringify(products)
    } catch (error: any) {
        throw new Error(error.message)
    }

}