import prisma from '@/lib/prisma'
import { IncomingHttpHeaders } from 'http'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import {Webhook, WebhookRequiredHeaders} from 'svix'
import Stripe from 'stripe'

const WebhookSecret = process.env.CLERK_WEBHOOK_SECRET || ''

type EventType = 'user.created' | 'user.updated' |'*'

type Event = {
    data: EventDataType,
    object: 'event',
    type: EventType
}

type EventDataType ={
    id: string,
    first_name: string,
    last_name: string,
    email_addresses: EmailAddressesType[];
    primary_email_addresses_id: string,
    attributes: Record<string, string|number>
}
type EmailAddressesType={
    id: string,
    email_address: string
}

async function handler(request: Request){
    const payload = await request.json()
    const headersList = headers()
    const heads = {
        'svix-id': headersList.get('svix-id'),
        'svix-timestamp':headersList.get('vix-timestamp'),
        'svix-signature': headersList.get('svix-signature')
    }
    const wh = new Webhook(WebhookSecret)
    let evt: Event | null = null

    try{evt = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event}
    catch(err){
        console.error((err as Error).message)
        return NextResponse.json({},{status:400})
    }
    
    const eventType: EventType = evt.type

    if(eventType === 'user.created' || eventType === 'user.updated'){
        if(eventType === 'user.created' || eventType === 'user.updated'){
            const {
                id,
                first_name,
                last_name,
                email_addresses,
                primary_email_addresses_id,
                ...attributes
            } = evt.data

            const secretKey= process.env.STRIPE_SECRET_KEY

            if (!secretKey) {
                throw new Error('STRIPE_SECRET_KEY is not defined');
            }
            
            const stripe = new Stripe(secretKey, {
                apiVersion: '2024-04-10'
            });

            const customer = await stripe.customers.create({
                name: `${first_name} ${last_name}`,
                email: email_addresses ? email_addresses[0].email_address:''
            })


            await prisma.user.upsert({
                where:{externalId: id as string},
                create:{
                    externalId: id as string, 
                    stripeCustomerId: customer.id, 
                    attributes
                },
                update:{attributes}
            })
        }
        return NextResponse.json({},{status:200})
    }
}

export const GET = handler
export const POST = handler
export const PUT = handler