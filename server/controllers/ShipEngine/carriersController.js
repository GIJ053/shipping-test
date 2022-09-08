const axios = require('axios')
const ShipEngine = require('shipengine')
const API_KEY = process.env.SHIPENGINE_KEY
const shipengine = new ShipEngine(API_KEY)

const getParcelCarriers = (req, res) => {
    async function getCarriers() {
        try {
            const result = await shipengine.listCarriers()

            res.json(result)
        } catch (e) {
            console.log("Error listing carriers: ", e.message)
        }
    }

    getCarriers()
}

const getLTLCarriers = (req, res) => {
    async function getLTLs() {
        const headers = {
            "Api-Key": API_KEY,
        }

        try {
            const result = await axios
                .get(`https://api.shipengine.com/v-beta/ltl/carriers`, { headers })
            console.log("The response")
            console.log(result.data)
            return res.json(result.data)
        } catch (e) {
            console.log('The request that was sent')
            console.log("Could not get LTLs: ", e.response.data.errors)
        }
    }

    getLTLs()
}

const getSingleLTL = (req, res) => {
    async function getLTL() {
        const headers = {
            "Api-Key": API_KEY,
        }

        let carrier_code = req.body.carrierCode

        try {
            const result = await axios
                .get(`https://api.shipengine.com/v-beta/ltl/carriers/${carrier_code}/features`, { headers })
            console.log("The response")
            console.log(result.data)
            return res.json(result.data)
        } catch (e) {
            console.log('The request that was sent')
            console.log("Could not get LTLs: ", e.response.data.errors)
        }
    }

    getLTL()
}

const connectTestCarrier = (req, res) => {
    async function connectTestLTL() {
        const headers = {
            "Api-Key": API_KEY,
        }

        const body = {
            credentials: {}
        }

        let carrier_code = req.body.carrierCode


        try {
            const result = await axios
                .post(`https://api.shipengine.com/v-beta/ltl/connections/${carrier_code}`, body, { headers })
            console.log("The response")
            console.log(result.status)
            return res.json(result.data)
        } catch (e) {
            console.log('The request that was sent')
            console.log("Could not connect carrier: ", e.response.data.errors)
        }
    }

    connectTestLTL()
}

module.exports = {
    getParcelCarriers,
    getSingleLTL,
    getLTLCarriers,
    connectTestCarrier
}