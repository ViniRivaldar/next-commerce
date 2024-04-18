import { ProductType } from "@/types/ProductType";
import Products from "./components/Products";
import Stripe from "stripe";


async function getProdutcs(): Promise<ProductType[]>{

  const secretKey= process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }
  
  const stripe = new Stripe(secretKey, {
    apiVersion: '2024-04-10'
  });

  const products = await stripe.products.list()

  const formatedProducts = await Promise.all(
    products.data.map(async (products)=>{
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

  return formatedProducts

}

export default async function Home() {

  const products = await getProdutcs()

  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 xl:gap-6">
        {
          products.map((produto)=>(
            <Products key={produto.id} product={produto}>
              
            </Products>
          ))
        }
      </div>
    </div>
  );
}
