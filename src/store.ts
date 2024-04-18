import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from './types/ProductType'

type CartState={
    cart: ProductType[],
    // addToCArt: (product: ProductType)=>void,
    // removeToCart: (product: string)=>void,
    isOpen: boolean
    toggleCart: ()=> void
}

export const useCartStore = create<CartState>()(
    persist((set)=>({
        cart: [],
        isOpen:false,
        toggleCart: ()=> set((state)=>({isOpen: !state}))
    }),{name:'cart-storage'})
)