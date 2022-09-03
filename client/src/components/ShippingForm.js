import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { FormCarrierSelector } from "./FormCarrierSelector"
import { PackageDetails } from "./PackageDetails"
import { LoadingNotification } from "./LoadingNotification"
import { StateSelect } from "./addressSelectors/StateSelect"
import { CountrySelect } from "./addressSelectors/CountrySelect"
import { getRates } from "../services/shipments"

const ShippingForm = (props) => {
    const [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        await getRates(data).then(response => {
            setLoading(false)
            if (response.length > 0) {
                navigate('/display-estimates', { state: { packages: response } })
            }
            else {
                alert('error')
            }
        })
    }

    const FormInput = ({ placeholder, field, register, required, maxLength }) => (
        <div className="form-control w-full max-w-xs">
            <input type="text" placeholder={placeholder} {...register(field, { required, maxLength })} className="input" />

            <label className="label">
                <span className="label-text-alt">{errors.name?.type === 'required' && `${placeholder} is required`}</span>
            </label>
        </div>
    )


    const { register, handleSubmit, formState: { errors } } = useForm()

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full grid grid-rows-3 grid-cols-2 gap-x-80 gap-y-5 bg-secondary rounded-xl p-6">
            <FormCarrierSelector register={register} />

            <FormInput placeholder="Name" field="name" register={register} required maxLength={20} className="input" />
            <FormInput placeholder="Phone" field="phone" register={register} required maxLength={15} className="input" />
            <FormInput placeholder="Address Line 1" field="addressLine1" register={register} required className="input" />
            <FormInput placeholder="City" field="cityLocality" register={register} required className="input" />

            <StateSelect register={register} />

            <FormInput placeholder="Zip" field="postalCode" register={register} required className="input" />

            <CountrySelect register={register} />

            <div className="form-control max-w-xs">
                <label className="label cursor-pointer">
                    <span className="label-text">Non-Residential</span>

                    <input
                        type="checkbox"
                        className="toggle"
                        {...register("addressResidentialIndicator")}
                    />

                    <span>Residential</span>
                </label>
            </div>

            <PackageDetails register={register} />

            <input type="submit" className={`btn col-span-2 mt-10 ${loading ? 'btn-disabled' : ''}`} />

            <LoadingNotification loading={loading} />
        </form>
    )
}

export default ShippingForm