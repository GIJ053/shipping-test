const ShipEngine = require('shipengine')
const shipengine = new ShipEngine(process.env.SHIPENGINE_KEY)


const getRate = (req, res) => {
    async function getRatesWithShipmentDetails() {
        const address = req.body.address

        const shipTo = {
            ...address,
            addressResidentialIndicator: address.addressResidentialIndicator ? "yes" : "no"
        }

        const rateOptions = {
            carrierIds: [
                "se-2884143"
            ]
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
            return res.json(result)
        } catch (e) {
            console.log("The request that was sent");
            console.log(params);
            console.log("Error creating rates: ", e.message);
        }
    }

    getRatesWithShipmentDetails();
}

module.exports = {
    getRate,
}