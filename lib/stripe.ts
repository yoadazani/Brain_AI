import Stripe from "stripe";

export const StripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
    typescript: true
})