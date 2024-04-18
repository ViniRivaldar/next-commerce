'use client'
import { useCartStore } from "../../store"

export default function Cart(){
    const useStore = useCartStore()
    
    return(
        <>
            <div onClick={()=> useStore.toggleCart()} className="flex items-center cursor-pointer" > 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
                     <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <span className="bg-teal-600 text-sm 
                font-bold rounded-full h-5 w-5 flex items-center justify-center
                absolute left-3 bottom-5"
                >
                2
                </span>
            </div>
            {useStore.isOpen && (
                <div onClick={()=> useStore.toggleCart()} className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">

                    <div onClick={(e)=>e.stopPropagation()} className='absolute bg-slate-600 right-0 top-0 w-1/3 h-full p-12 overflow-scroll'>
                        <h1>meu carrinho</h1>
                        {
                            useStore.cart.map((items)=>(
                                <div key={items.id}>{items.name}</div>
                            ))
                        }
                    </div>
                </div>
            )}
        </>
        
        
        
    )
}