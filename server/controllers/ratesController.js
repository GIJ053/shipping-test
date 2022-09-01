const axios = require('axios')
const API_KEY = process.env.SHIPENGINE_KEY
const ShipEngine = require('shipengine')
const shipengine = new ShipEngine(API_KEY)


const getRate = (req, res) => {
    async function getRatesWithShipmentDetails() {
        const userInput = req.body.userInput

        const packages = userInput.value && userInput.unit !== 'DEFAULT' ? [
            {
                weight: {
                    value: userInput.value,
                    unit: userInput.unit
                }
            }
        ] : null

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

        const shipFrom = {
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
        }

        const rateOptions = {
            carrierIds: [userInput.carrier]
        }

        const shipment = {
            validateAddress: "no_validation",
            shipTo: shipTo,
            shipFrom: shipFrom,
            packages: packages ?? null
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

            console.log("The request that was sent");
            console.log(params);

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
            "Api-Key": API_KEY,
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

const getLabel = (req, res) => {
    async function createLabelFromRate() {
        const savedRate = req.body.rateId

        const params = {
          rateId: savedRate,
          validateAddress: "no_validation",
          labelLayout: "4x6",
          labelFormat: "pdf",
          labelDownloadType: "url",
          displayScheme: "label"
        }
      
        try {
          const result = await shipengine.createLabelFromRate(params);
      
          console.log("The label that was created:");
          console.log(result);
          return res.json(result)
        } catch (e) {
          console.log("Error creating label: ", e.message);
        }
      }

    createLabelFromRate()
}

module.exports = {
    getRate,
    getEstimate,
    getLabel
}