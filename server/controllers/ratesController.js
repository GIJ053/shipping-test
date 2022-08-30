const axios = require('axios')
const ShipEngine = require('shipengine')
const shipengine = new ShipEngine(process.env.SHIPENGINE_KEY)


const getRate = (req, res) => {
    async function getRatesWithShipmentDetails() {
        const userInput = req.body.userInput

        const shipTo = {
            name: userInput.name,
            phone: userInput.phone,
            addressLine1: userInput.addressLine1,
            cityLocality: userInput.cityLocality,
            stateProvince: userInput.stateProvince,
            postalCode: userInput.postalCode,
            countryCode: userInput.countryCode,
            addressResidentialIndicator: userInput.addressResidentialIndicator ? "yes" : "no"
        }

        const rateOptions = {
            carrierIds: [userInput.carrier]
        }

        const shipment = {
            validateAddress: "no_validation",
            shipTo: shipTo,
            shipFrom: {
                companyName: "Example Corp.",
                name: "John Doe",
                phone: "111-111-1111",
                addressLine1: "4009 Marathon Blvd",
                addressLine2: "Suite 300",
                cityLocality: "Austin",
                stateProvince: "TX",
                postalCode: "78756",
                countryCode: "US",
                addressResidentialIndicator: "no",
            },
            packages: [
                {
                    weight: {
                        value: 1.0,
                        unit: "ounce",
                    },
                },
            ],
        }

        const params = {
            rateOptions,
            shipment
        }

        // const params = {
        //     rateOptions: {
        //         carrierIds: [
        //             "se-2884143"
        //         ]
        //     },
        //     shipment: {
        //         validateAddress: "no_validation",
        //         shipTo: {
        //             name: "Amanda Miller",
        //             phone: "555-555-5555",
        //             addressLine1: "525 S Winchester Blvd",
        //             cityLocality: "San Jose",
        //             stateProvince: "CA",
        //             postalCode: "95128",
        //             countryCode: "US",
        //             addressResidentialIndicator: "yes",
        //         },
        //         shipFrom: {
        //             companyName: "Example Corp.",
        //             name: "John Doe",
        //             phone: "111-111-1111",
        //             addressLine1: "4009 Marathon Blvd",
        //             addressLine2: "Suite 300",
        //             cityLocality: "Austin",
        //             stateProvince: "TX",
        //             postalCode: "78756",
        //             countryCode: "US",
        //             addressResidentialIndicator: "no",
        //         },
        //         packages: [
        //             {
        //                 weight: {
        //                     value: 1.0,
        //                     unit: "ounce",
        //                 },
        //             },
        //         ],
        //     },
        // };

        try {
            const result = await shipengine.getRatesWithShipmentDetails(params);

            console.log("The rates that were created:");
            console.log(result);
            return res.json(result.rateResponse.rates)
        } catch (e) {
            console.log("The request that was sent");
            console.log(params);
            console.log("Error creating rates: ", e.message);
        }
    }

    getRatesWithShipmentDetails();
}

const getEstimate = (req, res) => {
    async function grabEstimate() {
        const userParams = req.body.location

        const params = {
            ...userParams,
            to_country_code: "US",
            to_postal_code: "91521"
        }

        // const params = {
        //     carrier_ids: [
        //         "se-2884143",
        //     ],
        //     from_country_code: "US",
        //     from_postal_code: "78756",
        //     to_country_code: "US",
        //     to_postal_code: "91521",
        //     weight: {
        //         value: 17,
        //         unit: "pound"
        //     }
        // }


    
        const headers = {
            "Api-Key": process.env.SHIPENGINE_KEY,
            "Content-Type": 'application/json'
        }

        try {
            const result = await axios
                .post('https://api.shipengine.com/v1/rates/estimate', params, {headers})
                console.log(result.data)
                return res.json(result.data)
        } catch (e) {
            console.log("The request that was sent");
            console.log(params);
            console.log("Error getting estimate: ", e);
        }
    }

    grabEstimate()
}

module.exports = {
    getRate,
    getEstimate
}