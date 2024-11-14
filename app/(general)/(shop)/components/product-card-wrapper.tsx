import React from 'react'
import { ProductCard } from './product-card'
import { getAverageColor } from 'fast-average-color-node';
import { IRecord } from '@/app/models/definitions/IRecord';
import { makeDarkerColor } from '@/app/lib/fuctions';



export default async function ProductCardWrapper({ product }:
    { product: IRecord }
) {
    const avarageColor = await getAverageColor(product.image)

    return (
        <div>
            <ProductCard product={product} avarageImageColor={avarageColor.hex} />
        </div>
    )
}
