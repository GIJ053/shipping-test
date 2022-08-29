import { useForm } from "react-hook-form"
import CarrierSelector from "../components/CarrierSelector"
import { getRates } from "../services/shipments"

const ShippingEstimate = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
        getRates(data)
        console.log(data);
    }

    const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone


    return (
        <div className="hero bg-base-100 basis-11/12 my-6">
            <div className="hero-content h-full w-11/12 flex-col gap-1 bg-secondary rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full bg-slate-500">
                    <CarrierSelector />
                </form>

            </div>
        </div>
    )
}

export default ShippingEstimate