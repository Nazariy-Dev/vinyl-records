'use client'

import useCart from "@/app/store/store"
import CartItem from "./cart-item"


export default function CartOverview() {
  const cartItems = useCart(state => state.cart)

  return (
    <div className="w-1/2 flex gap-4 flex-col">
      {cartItems.map((item) => <CartItem key={item.priceId} item={item} />)}
      <div className="divider md:hidden"></div>
    </div>

  )

}
