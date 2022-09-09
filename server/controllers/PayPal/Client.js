const payoutsNodeJssdk = require('@paypal/payouts-sdk')

function client() {
    return new payoutsNodeJssdk.core.PayPalHttpClient(environment())
}

function environment() {
    let clientId = process.env.PAYPAL_CLIENT_ID
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET

    return new payoutsNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}

module.exports = { client: client }