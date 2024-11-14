import { create } from "zustand"

export interface ICartItem {
    name: string
    priceId: string
    unit_amount: number
    quantity: number
    author: string,
    image: string
}

export interface Cart {
    cart: ICartItem[]
    addItemToCart: (params: any) => void
}

const useCart = create<Cart>(
    (set, get) => ({
        cart: [],
        addItemToCart: (params: {newProduct: ICartItem}) => {
            const { newProduct } = params

            set((state) => {
                let index = 0;

                const productExist = state.cart.find((product, i) => {
                    if (product.priceId == newProduct.priceId) {
                        index = i;
                        return true
                    }
                })

                if (!productExist) {
                    const newCart = [...state.cart, newProduct]

                    return {
                        ...state, cart: newCart
                    }
                }

                const newCart = [...state.cart]
                newCart[index] = { ...newCart[index], quantity: newCart[index].quantity += 1 }
                return { cart: newCart }
            })
        }
    })
)

export default useCart
