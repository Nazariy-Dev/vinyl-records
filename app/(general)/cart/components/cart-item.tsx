import { ICartItem } from "@/app/store/store";
import Line from "./line";

export default function CartItem({ item }: { item: ICartItem }) {
    const { name, quantity, unit_amount: cost, image, author } = item
    return (
        <div className="flex items-center gap-6 ">
            <div className="max-h-16 max-w-16 shrink-0">
                <img className="w-full h-full" src={image} alt="" />
            </div>
            <div className="flex flex-col">
                <div className="font-bold text-xl">
                    {name}
                </div>
                <div>
                    {author}
                </div>
            </div>
            <Line />
            <div>
                {quantity}x
            </div>
            <Line />

            <div className="text-secondary font-semibold">
                {(cost )* quantity} usd
            </div>
        </div>

    )
}
