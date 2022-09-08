const stripe = require('stripe')(process.env.STRIPE_KEY)
const currency = 'usd'

const topUpStripe = (req, res, next) => {
    async function topUp() {
        try {
            const topup = await stripe.topups.create({
                amount: req.body.amount,
                currency: currency,
                description: req.body.description,
                statement_descriptor: req.body.statement
            })

            console.log("Topped up!");
            res.json(topup)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    topUp()
}

const createPaymentGroup = (req, res, next) => {
    async function createGroup() {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 10000,
                currency: currency,
                transfer_group: '{ORDER10}'
            })

            console.log("Group created");
            res.json(paymentIntent)
        } catch (e) {
            console.log(e);
            next(e)
        }
    }

    createGroup()
}

const payoutStripe = (req, res, next) => {
    async function payout() {
        try {
            const transfer = await stripe.transfers.create({
                amount: req.body.amount,
                currency: currency,
                destination: req.body.accountId
            })

            res.json(transfer)
        } catch (e) {
            next(e)
        }
    }

    payout()
}

const payoutGroup = (req, res, next) => {
    async function payout() {
        try {
            const firstTransfer = await stripe.transfers.create({
                amount: 7000,
                currency: currency,
                destination: 'acct_1LfXhtR81uDbdwWB',
                transfer_group: '{ORDER10}',
            })

            const secondTransfer = await stripe.transfers.create({
                amount: 2000,
                currency: currency,
                destination: 'acct_1LfS6hQqdSRPg4iN',
                transfer_group: '{ORDER10}',
            })

            res.json(firstTransfer)
        } catch (e) {
            next(e)
        }
    }

    payout()
}

// const simulateOutsidePurchase = (req, res, next) => {
//     const sellerId = req.body.accountId
//     const amount = req.body.amount

//     async function topUp() {
//         try {
//             const topup = await stripe.topups.create({
//                 amount: req.body.amount,
//                 currency: currency,
//                 description: req.body.description,
//                 statement_descriptor: req.body.statement
//             })

//             console.log("Topped up!");
//             res.json(topup)
//         } catch (e) {
//             console.log(e)
//             next(e)
//         }
//     }
// }

module.exports = {
    topUpStripe,
    createPaymentGroup,
    payoutStripe,
    payoutGroup
}