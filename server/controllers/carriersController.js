const ShipEngine = require('shipengine')
const shipengine = new ShipEngine(process.env.SHIPENGINE_KEY)

const getAll = (req, res) => {
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

module.exports = {
    getAll,
}