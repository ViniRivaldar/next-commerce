import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductType } from './types/ProductType'

type CartState={
    cart: ProductType[],
    addProduct: (product: ProductType)=>void,
    removeProduct: (product: ProductType)=>void,
    isOpen: boolean
    toggleCart: ()=> void
    onCheckout: string
    setCheckout: (checkout:string)=>void
}

export const useCartStore = create<CartState>()(
    persist((set)=>({
        cart: [],
        addProduct: (item)=>{
            set((state)=>{
                const product = state.cart.find((p)=> p.id === item.id)
                if(product){
                    const updateCart = state.cart.map((p)=>{
                        if(p.id === item.id){
                            return {...p, quantity : p.quantity ? p.quantity +1:1}
                        }
                        return p
                    })
                    return{cart: updateCart}
                }else{
                    return{cart: [...state.cart, {...item, quantity:1}]}

                }
            })
        },
        removeProduct: (item)=>{
            set((state)=>{
                const existProduct = state.cart.find((p)=> p.id === item.id)
                if(existProduct && existProduct.quantity! > 1){
                    const updatedCart = state.cart.map((p)=>{
                        if(p.id === item.id){
                            return {...p, quantity: item.quantity! - 1}
                        }
                        return p;
                    })
                    return{cart: updatedCart}
                }else {
                    const filteredCart = state.cart.filter((p)=>p.id !== item.id)
                    
                    return {cart: filteredCart}
                }
                
                
            })
        },
        
        isOpen:false,
        toggleCart: ()=> set((state)=>({isOpen: !state.isOpen})),
        onCheckout: 'cart',
        setCheckout: (checkout) => set({ onCheckout: checkout }),

    }),{name:'cart-storage'})
)