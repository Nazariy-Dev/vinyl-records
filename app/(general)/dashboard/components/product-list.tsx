
import { IRecord } from "@/app/models/definitions/IRecord"
import ProductCard from "./product-card"
import { IUnits } from "@/app/models/definitions/IUnits"
import { IGenres } from "@/app/models/definitions/IGenres"
import { IAuthor } from "@/app/models/definitions/IAuthor"
import { fetchAuthors, fetchGenres, fetchUnits } from "@/app/lib/data"

interface ProductListProps {
    products: IRecord[];
}

export default async function ProductList({products}: ProductListProps) {


    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Created</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Author</th>
                        <th>Created</th>
                        <th>actions</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
