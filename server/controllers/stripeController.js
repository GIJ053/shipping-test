const axios = require('axios')
const stripe = require('stripe')(process.env.STRIPE_KEY)

const createStripeAccount = (req, res) => {
    async function createAccount() {
        const account = await stripe.accounts.create({ type: express })
    }

    createAccount()
}