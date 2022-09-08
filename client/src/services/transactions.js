import axios from "axios"

export const simulateNonStripePurchase = async (purchaseDetails) => {
    const payment = {
        amount: purchaseDetails.cost * 0.9,
        accountId: purchaseDetails.sellerId
    }

    const topUpRes = await axios.post('/api/topup', { amount: purchaseDetails.cost })
    const payoutRes = axios.post('/api/payout', payment)

    return await payoutRes
}