const axios = require('axios')
const API_KEY = process.env.SHIPENGINE_KEY
const ShipEngine = require('shipengine')
const shipengine = new ShipEngine(API_KEY)

const displayTracking = (req, res) => {
    async function trackWithoutLabel() {
        const params = {
            carrierCode: req.params.carrierCode,
            trackingNumber: req.params.trackingNumber
        }

        try {
            const result = await shipengine.trackUsingCarrierCodeAndTrackingNumber(params)

            console.log("Tracking info:")
            console.log(result)
            return res.json(result)
        } catch(e) {
            console.log("Error tracking shipment: ", e.message)
        }
    }

    trackWithoutLabel()
}

const startTracking = (req, res) => {
    async function track() {
        const headers = {
            "Api-Key": API_KEY,
        }
    
        let carrier_code = req.body.carrierCode
        let tracking_number = req.body.trackingNumber
    
        try {
            const result = await axios
                .post(`https://api.shipengine.com/v1/tracking/start?carrier_code=${carrier_code}&tracking_number=${tracking_number}`, { headers })
                console.log("The response")
                console.log(result)
                return res.json(result.data)
        } catch (e) {
            console.log('The request that was sent')
            console.log(req.body)
            console.log("The response that was sent")
            console.log("Could not start tracking: ", e.response.data.errors)
        }
    }
    track()
}

module.exports = {
    displayTracking,
    startTracking
}