'use server'
import {ProductType} from '../types/ProductType'
import {stripe} from '../lib/stripe'

export async function FetchProdutcs({
  lastProductId
}:{
  lastProductId: string|undefined
}){

  const params = lastProductId ?{starting_after: lastProductId, limit: 8}:{}

  const {data:products, has_more} = await stripe.products.list(params)
  
    const formatedProducts = await Promise.all(
      products.map(async (products)=>{
        const price = await stripe.prices.list({
          product:products.id
        })
        return {
          id: products.id,
          price:price.data[0].unit_amount,
          name: products.name,
          image:products.images[0],
          description:products.description,
          currency:price.data[0].currency
        }
      })
    ) 
  
    return {formatedProducts,has_more}
  
}