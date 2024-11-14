import Stripe from "stripe"
import { ProductCard } from "./product-card"
import { IRecord } from "@/app/models/definitions/IRecord"
import ProductCardWrapper from "./product-card-wrapper"

export default function Products({ products }: { products: IRecord[] }) {

    return (
        <>
            {products.length == 0 &&
                <div className="text-xl font-semibold text-center mt-[20%]">Sorry, we don't have records of this genre yet</div>
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-[max-content] gap-10 pb-8 flex-1">
                {products.map((product) => {
                    
                    // return <ProductCard key={product.priceId} product={product} />
                    return <ProductCardWrapper key={product.priceId} product={product} />
                })}
            </div>
        </>
    )
}


