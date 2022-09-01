import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { LoadingNotification } from "../components/LoadingNotification"
import { displayTracking } from "../services/tracking"

const Test = () => {
    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        await displayTracking(data).then(response => {
            navigate(`/tracking/${data.carrierCode}/${data.trackingNumber}`, {state: {trackingInfo: response}})
        })
    }

    return (
        <div className="hero bg-base-100 basis-11/12 my-6">
            <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select defaultValue={'DEFAULT'} {...register("carrierCode")} className="select w-full max-w-xs">
                        <option disabled value='DEFAULT'>Select Carrier</option>
                        <option value='stamps_com'>USPS</option>
                        <option value='ups'>UPS</option>
                        <option value='fedex'>FedEx</option>
                    </select>

                    <input type="text" placeholder="Tracking Number" {...register("trackingNumber")} className="input w-full max-w-xs" />

                    <input type="submit" className="btn" />
                </form>
            </div>

            <LoadingNotification loading={loading}/>
        </div>
    )
}

export default Test