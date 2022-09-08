const axios = require('axios')
const API_KEY = process.env.SHIPENGINE_KEY

const createTrackingWebhook = (req, res) => {
    async function createWebhook() {
        const url = req.body.url
        const event = req.body.event

        const headers = {
            "Api-Key": API_KEY,
            "Content-Type": 'application/json'
        }
    
        const params = {
            url: url,
            event: event
        }

        try {
            const result = await axios
                .post('https://api.shipengine.com/v1/environment/webhooks', params, { headers })
                console.log("The response");
                console.log(result.data);
                return res.json(result.data)
        } catch (e) {
            console.log("The response that was sent");
            console.log("Error creating webhook: ", e.response.data);
        }
    }

    createWebhook()
}

const createTrackingWebhookListener = (req, res) => {
    let trackingNumber = req.body.data.tracking_number
    let statusCode = req.body.data.status_code

    switch(statusCode) {
        case ("AC"):
            console.log(`${trackingNumber}: Accepted`);
            break
        case ("IT"):
            console.log(`${trackingNumber}: In Transit`);
            break
        case ("AT"):
            console.log(`${trackingNumber}: Delivery Attempt`);
            break
        case ("DE"):
            console.log(`${trackingNumber}: Delivered!`);
            break
        default:
            console.log(`${trackingNumber}: Error`);
            break
    }

    res.sendStatus(200)
}

const listWebhooks = (req, res) => {
    async function getWebhooks() {
        const headers = {
            "Api-Key": API_KEY,
        }

        try {
            const result = await axios
                .get('https://api.shipengine.com/v1/environment/webhooks', { headers })
                console.log("The response");
                console.log(result);
                return res.json(result.data)
        } catch (e) {
            console.log("The response that was sent");
            console.log("Error getting webhooks: ", e.response.data);
        }
    }
    
    getWebhooks()
}

module.exports = {
    createTrackingWebhook,
    createTrackingWebhookListener,
    listWebhooks
}