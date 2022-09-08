import { CarrierSelector } from "../../components/CarrierSelector"
import { getEstimate } from "../../services/shipments"
import { useState } from "react"
import { Link } from "react-router-dom"
import { LoadingNotification } from "../../components/LoadingNotification"

const ShippingEstimate = () => {
    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const [currentCarrier, setCurrentCarrier] = useState('')
    const [packages, setPackages] = useState()
    const [loading, setLoading] = useState(false)

    const handleSelect = async (event) => {
        setLoading(true)
        setPackages() //resets packages so that people can't spam submit
        setCurrentCarrier(event.target.value)

        setPackages(await getEstimate({
            carrier_ids: [event.target.value],
            from_country_code: "US",
            from_postal_code: "78756",
            weight: {
                value: 17,
                unit: "pound"
            }
        }))

        setLoading(false)
    }

    return (
        <div className="hero bg-base-100 basis-11/12 my-6">
            <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
                <div className="w-full h-full">
                    <CarrierSelector handler={handleSelect} timeZone={browserTimeZone} />

                    <Link
                        to="/display-estimates"
                        state={{ packages: packages }}
                        className={`btn ${packages && currentCarrier !== '' ? '' : 'btn-disabled'}`}
                    >
                        Submit
                    </Link>
                </div>
            </div>

            <LoadingNotification loading={loading} />
        </div>
    )
}

export default ShippingEstimate