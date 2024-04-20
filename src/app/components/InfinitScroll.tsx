'use client'
import { ProductType } from "@/types/ProductType";
import { useCallback, useEffect, useState } from "react";
import Products from "./Products";
import { useInView } from "react-intersection-observer";
import { FetchProdutcs } from "../actions";

export default function InfinitScroll({
    initialProducts
}:{initialProducts: ProductType[]}){

    const [product, setProduct] = useState<ProductType[]>(initialProducts)
    const [hasMore, setHasMore]= useState<boolean>(true)
    const [isLoading, setIsLoading]= useState<boolean>(false)
    const [ref, inView] = useInView({
        threshold:0,
        triggerOnce: false
    })

    const lastProductId = product[product.length-1] ?.id

    const LoadMoreProduct = useCallback(async ()=>{
        setIsLoading(true)
        const{formatedProducts, has_more} = await FetchProdutcs({lastProductId})

        if(formatedProducts){
            setProduct((prevProduct)=>[...prevProduct,...formatedProducts])
            setHasMore(has_more)
        }

        setIsLoading(false)

    },[lastProductId])

    useEffect(()=>{
        if(inView && hasMore && !isLoading){
            LoadMoreProduct()
        }
    },[inView,hasMore,isLoading,LoadMoreProduct])

    if(!product){
        return <div>carregando...</div>
    }

    return (
        <>
            {product.map((produto)=>(
                <Products key={produto.id} product={produto} />
            ))}
            {hasMore &&(
                <div ref={ref}>carregando mais registros...</div>
            )}

        </>
    )
    
}