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

        const body = {

        }
    
        let carrier_code = req.body.carrierCode
        let tracking_number = req.body.trackingNumber
    
        try {
            const result = await axios
                .post(`https://api.shipengine.com/v1/tracking/start?carrier_code=${carrier_code}&tracking_number=${tracking_number}`,{body}, { headers })
                console.log("The response")
                console.log(result.status)
                return res.json(`Started Tracking: ${tracking_number}`)
        } catch (e) {
            console.log('The request that was sent')
            console.log(req)
            console.log("The response that was sent")
            console.log("Could not start tracking: ", e.response)
        }
    }
    track()
}

const stopTracking = (req, res) => {
    async function stop() {
        const headers = {
            "Api-Key": API_KEY,
        }

        const body = {

        }
    
        let carrier_code = req.body.carrierCode
        let tracking_number = req.body.trackingNumber
    
        try {
            const result = await axios
                .post(`https://api.shipengine.com/v1/tracking/stop?carrier_code=${carrier_code}&tracking_number=${tracking_number}`,{body}, { headers })
                console.log("The response")
                console.log(result.status)
                return res.json(`Stopped Tracking: ${tracking_number}`)
        } catch (e) {
            console.log('The request that was sent')
            console.log(req)
            console.log("The response that was sent")
            console.log("Could not stop tracking: ", e.response)
        }
    }
    stop()
}

module.exports = {
    displayTracking,
    startTracking,
    stopTracking
}