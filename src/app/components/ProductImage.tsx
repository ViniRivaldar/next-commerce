'use client'

import { ProductType } from "@/types/ProductType"
import Image from "next/image"
import { useState } from "react"

type ProductImageProps={
    product: ProductType,
    fill?: boolean
}
export default function ProductImage({product,fill}:ProductImageProps ){
    const [loading, setLoading] = useState(true)


    return fill ?(
        <Image 
        src={product.image}
        fill
        alt={product.name}
        sizes="(max-width: 400px) 100vw, 400px"
        priority
        className={`object-cover ${
            loading ? 'scale-100 blur-3xl grayscale':'scale-100 blur-0 grayscale-0'
        }`}

        onLoad={()=>setLoading(false)}
        />
    ):(
        <Image 
        src={product.image}
        width={400}
        height={700}
        alt={product.name}
        priority
        className={`object-cover ${
            loading ? 'scale-100 blur-3xl grayscale':'scale-100 blur-0 grayscale-0'
        }`}

        onLoad={()=>setLoading(false)}
        />
    )

}
