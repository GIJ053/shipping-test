const payoutsSdk = require('@paypal/payouts-sdk')

const payPalClient = require('./Client')

const createPayout = (req, res, next) => {
    async function payout() {
        const senderBatchId = "Test_sdk_" + Math.random().toString(36).substring(7)
        const amount = "1.00"

        const header = {
            recipient_type: "EMAIL",
            email_message: "SDK payouts test txn",
            note: "Enjoy your Payout!",
            sender_batch_id: senderBatchId,
            email_subject: "Test transaction from SDK"
        }

        const payouts = [{
            note: "Your $1 Payout!",
            amount: {
                currency: "USD",
                value: amount
            },
            receiver: "sb-e9wg620759117@business.example.com",
            sender_item_id: "Test_txn_1"
        }, {
            note: "Your $1 Payout!",
            amount: {
                currency: "USD",
                value: amount
            },
            receiver: "sb-ia47t720730757@personal.example.com",
            sender_item_id: "Test_txn_2"
        }]

        const body = {
            sender_batch_header: header,
            items: payouts
        }

        try {
            console.log('hello');

            const request = new payoutsSdk.payouts.PayoutsPostRequest()
            request.requestBody(body)
            console.log(request);

            const response = await payPalClient.client().execute(request)
            console.log(response);

            return res.json(response.result)
        } catch (e) {
            next(e)
        }
    }

    payout()
}

module.exports = {
    createPayout,
}