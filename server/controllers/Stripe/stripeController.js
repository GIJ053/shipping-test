const stripe = require('stripe')(process.env.STRIPE_KEY)

const createStripeAccount = (req, res) => {
    async function createAccount() {
        try {
            const account = await stripe.accounts.create({ type: 'express' })
            res.json(account.id)
        } catch (e) {
            console.log("Error creating account: ", e.message);
        }
    }

    createAccount()
}

const createStripeCustomer = async (req, res, next) => {
    try {
        const customer = await stripe.customers.create({
            description: 'My Second Test Customer (created for API docs at https://www.stripe.com/docs/api)',
        })

        return customer
    } catch (e) {
        return next(e);
    }
}

const deleteStripeAccount = (req, res, next) => {
    async function deleteAccount() {
        try {
            const deleted = await stripe.accounts.del(
                req.body.id
            )

            return res.json(deleted)
        } catch (e) {
            next(e)
        }
    }

    deleteAccount()
}

const createAccountLink = (req, res) => {
    async function linkAccount() {
        try {
            const accountLink = await stripe.accountLinks.create({
                account: req.body.account,
                refresh_url: 'http://localhost:3001/reauth',
                return_url: 'http://localhost:3001/return',
                type: 'account_onboarding',
            });

            return res.json(accountLink)

        } catch (e) {
            console.log("Error linking account: ", e.message);
        }
    }

    linkAccount()
}

const createStripeSession = (req, res, next) => {
    async function createSession() {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'T-shirt',
                            },
                            unit_amount: 2000,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: 'http://localhost:3001/success',
                cancel_url: 'http://localhost:3001/test-product',
            })

            res.redirect(303, session.url)
        } catch (e) {
            next(e)
        }
    }

    createSession()
}

const createStripeBankToken = async (req, res, next) => {
    try {
        const token = await stripe.tokens.create({
            bank_account: {
                country: 'US',
                currency: 'usd',
                routing_number: '110000000',
                account_number: '000123456789',
                account_holder_name: 'Jenny Rosen',
                account_holder_type: 'individual',
            }
        })
        console.log(token);
        return (token)
    } catch (e) {
        return next(e);
    }
}

const verifyBankAccount = async (req, res, next) => {
    try {
        const token = await createStripeBankToken()

        const customer = await stripe.customers.create({
            description: 'Example customer',
            source: token.id,
        })

        res.json(customer);
    } catch (e) {
        return next(e);
    }
}

const verify = async (req, res, next) => {
    try {
        const customerId = 'cus_MRhawgdXaZy9vc'
        const bankId = 'ba_1LioAwJoLuBft2AbJzrvyHQd'

        const bankAccount = await stripe.customers.verifySource(
            customerId,
            bankId,
            { amounts: [32, 45] }
        )
        res.status(200).json(bankAccount)
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    createStripeAccount,
    deleteStripeAccount,
    createAccountLink,
    createStripeSession,
    createStripeBankToken,
    createStripeCustomer,
    verifyBankAccount,
    verify
}