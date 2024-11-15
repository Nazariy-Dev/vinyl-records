'use client'

import { IRecord } from '@/app/models/definitions/IRecord';
import useCart, { ICartItem } from '@/app/store/store';
import Stripe from "stripe";


export default function OverviewSection({ product }: { product: IRecord }) {
    const { name, priceId, price: unit_amount, author, image, genres, releaseDate, unitsInAlbum,songs } = product

    const addItemToCartd = useCart(state => state.addItemToCart)


    const onProductClick = () => {
        const newProduct: ICartItem = {
            name,
            priceId,
            unit_amount,
            quantity: 1,
            author: author.name,
            image
        }
        addItemToCartd({ newProduct })
    }

    return (
        <div className='flex gap-4 sm:gap-28 mb-[64px] sm:flex-row flex-col'>
            <div className='w-full flex items-center'>
                <img className='w-full aspect-square object-cover' src={image} alt="" />
            </div>
            <div className='flex flex-col w-full justify-between pt-9 gap-6 sm:gap-4'>
                <div>
                    <div className='mb-2 text-4xl font-semibold '>
                        {name}
                    </div>
                    <div className=' leading-5 text-2xl'>
                        {author.name}
                    </div>
                </div>
                <div className='text-xl flex flex-col'>
                    <div>
                        <span className='text-[#929292] mr-[5px]'>genre:</span>
                        <span className='font-medium'>{genres?.map(val => <span>{val.name.toLowerCase()} </span>)}</span>
                    </div>
                    <div>
                        <span className='text-[#929292] mr-[5px]'>release:</span>
                        <span className='font-medium'>{new Date(releaseDate).getFullYear()}</span>
                    </div>
                    <div>
                        <span className='text-[#929292] mr-[5px]'>units in album:</span>
                        <span className='font-medium'>{unitsInAlbum.name}</span>
                    </div>
                </div>
                <div className='flex justify-between relative'>
                    {/* <div className=' absolute left-0 -top-7 text-[#929292] '>
                        {label}
                    </div> */}
                    <div className='border-[3px] border-accent text-2xl font-bold p-2'>
                        {unit_amount} usd
                    </div>
                    <div onClick={() => onProductClick()} className='btn rounded-none bg-accent text-2xl font-bold p-2 px-4'>
                        Buy
                    </div>
                </div>
            </div>
        </div>
    )
}
