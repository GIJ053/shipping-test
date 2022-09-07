const stripe = require('stripe')(process.env.STRIPE_KEY)

const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
};

const createStripeAccount = (req, res) => {
    async function createAccount() {
        try {
            const account = await stripe.accounts.create({ type: 'express' })
            res.json(account)
        } catch (e) {
            console.log("Error creating account: ", e.message);
        }
    }

    createAccount()
}

const createAccountLink = (req, res) => {
    async function linkAccount() {
        try {
            const accountLink = await stripe.accountLinks.create({
                account: 'acct_1Lf8yGR9qpLBn4pE',
                refresh_url: 'http://example.com/reauth',
                return_url: 'https://example.com/return',
                type: 'account_onboarding',
            });

            return res.json(accountLink)

        } catch (e) {
            console.log("Error linking account: ", e.message);
        }
    }

    linkAccount()
}

const createPaymentIntent = (req, res) => {
    const items = req.body
    async function createIntent() {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(items),
                currency: "usd",
                automatic_payment_methods: {
                    enabled: true,
                },
            })

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        } catch (e) {
            console.log("Errpr creating intent: ", e.message);
        }
    }
}

module.exports = {
    createStripeAccount,
    createAccountLink,
}