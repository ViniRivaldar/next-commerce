'use client'
import Image from "next/image"
import { useCartStore } from "../../store"
import { formatPrice } from "@/lib/Utils"
import CheckoutButton from "./CheckoutButton"

export default function CartDrawer(){
    const useStore = useCartStore()
    const totalPrice = useStore.cart.reduce((acc,item)=>{
        return acc + item.price! + item.quantity!
    },0)

    return(
        <div onClick={()=> useStore.toggleCart()} className="fixed w-full h-screen bg-black/25 
        left-0 top-0 z-50">

            <div onClick={(e)=>e.stopPropagation()} className='absolute bg-slate-600 right-0 
            top-0 w-1/3 h-full p-12 overflow-scroll'>

                <button onClick={()=> useStore.toggleCart()} className="font-bold text-sm 
                text-teal-600">Voltar para a Loja</button>
                <div className="border-t border-gray-400 my-4"></div>
                    {
                        useStore.cart.map((items)=>(
                            <div key={items.id} className="flex gap-4 py-4">
                                <Image 
                                src={items.image}
                                alt={items.name}
                                width={120}
                                height={120}
                                className="object-cover"/>

                                <div>
                                    <h2 className="w-42 truncate">{items.name}</h2>
                                    <h2>Quantidade: {items.quantity}</h2>
                                    <p className="text-teal-600 text-sm font-bold">
                                        {formatPrice(items.price)}
                                    </p>
                                    <button className="py-1 px-2 border rounded-md mt-2 text-sm mr-1" 
                                    onClick={()=> useStore.addProduct(items)}>Adicionar</button>
                                    <button onClick={()=>useStore.removeProduct(items)}
                                    className="py-1 px-2 border rounded-md mt-2 text-sm">Remover</button>
                                </div>

                                
                            </div>
                        ))
                    }
                    {
                        useStore.cart.length >0 && useStore.onCheckout === 'cart' &&(
                            <CheckoutButton totalPrice={totalPrice}/>
                        )
                    }
            </div>

        </div>
    )
}