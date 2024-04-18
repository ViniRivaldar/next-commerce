export const formatPrice = (price: number|null)=>{

    if(!price) return "R$ 0,00"

    return new Intl.NumberFormat('pr-br',{
        style:"currency",
        currency: "BRL"
    }).format(price/100)
}