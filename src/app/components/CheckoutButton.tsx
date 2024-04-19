'use client'
import { useUser } from "@clerk/nextjs"
import { useCartStore } from "../../store"
import { formatPrice } from "@/lib/Utils"
import { useRouter } from "next/navigation"

type CheckouButtonProps ={
    totalPrice: number
}

export default function CheckoutButton({totalPrice}: CheckouButtonProps){
    const router = useRouter()
    const {user} = useUser()
    const cartStore = useCartStore()

    const handlerCheckout = async ()=>{
        if(!user){
            cartStore.toggleCart()
            router.push(`sign-in?redirectUrl='/'`)
            return

        }
        cartStore.setCheckout('checkout')
    }
   
    return(
        <div>
            <p className="text-teal-600 font-bold">Total: {formatPrice(totalPrice)}</p>
            <button onClick={handlerCheckout}className="w-full rounded-md bg-teal-600 text-white py-2 mt-2">Finalizar Compra</button>
        </div>
    )
}