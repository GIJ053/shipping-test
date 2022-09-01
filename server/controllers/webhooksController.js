const axios = require('axios')
const API_KEY = process.env.SHIPENGINE_KEY

const createTrackingWebhook = (req, res) => {
    let trackingNumber = req.body.data.tracking_number
    let statusCode = req.body.data.status_code

    if(statusCode === 'DE') {
        console.log('Delivered!');
    }
    console.log(res);
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
    listWebhooks
}