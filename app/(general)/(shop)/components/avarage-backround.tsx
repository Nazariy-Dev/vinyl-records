import { getAverageColor } from 'fast-average-color-node'

import { ProductProps } from './product-card'
import { makeDarkerColor } from '@/app/lib/fuctions'



export default async function AvarageBackround({ product }: ProductProps) {
    const { metadata, default_price, images: urls } = product
    const { author, name } = metadata
    const { unit_amount }: any = default_price

    const avg = await getAverageColor(urls[0])
    const darkerAvg = makeDarkerColor(avg.value)



    return (
        <div className={'text-white relative w-full p-4 bg-opacity-45'}
            style={{ backgroundColor: darkerAvg }}
        >
            <div className=' text-xl font-medium '>
                {name}
            </div>
            <div className=' leading-5'>
                {author}
            </div>
            <div className='flex justify-between items-center mt-3 '>
                <div className=' text-accent'>{unit_amount! / 100} usd</div>
            </div>
        </div>
    )
}
