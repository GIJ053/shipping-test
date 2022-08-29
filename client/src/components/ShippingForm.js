import { useForm } from "react-hook-form"
import CarrierSelector from "./CarrierSelector"
import StateSelect from "./StateSelect"
import CountrySelect from "./CountrySelect"
import { getRates } from "../services/shipments"

const ShippingForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => {
        getRates(data)
        console.log(data);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full grid grid-rows-3 grid-cols-2 gap-x-80 gap-y-5 bg-secondary rounded-xl p-6">
            <CarrierSelector />


            {/* include validation with required or other standard HTML validation rules */}

            <div className="form-control w-full max-w-xs">
                <input type="text" placeholder="Name" {...register("name", { required: true, maxLength: 20 })} className="input" />

                <label className="label">
                    <span className="label-text-alt">{errors.name?.type === 'required' && "Name is required"}</span>
                </label>
            </div>

            <input type="text" placeholder="Phone" {...register("phone", { required: true, maxLength: 15 })} className="input " />
            {/* {errors.phone?.type === 'required' && "Phone number is required"} */}

            <input type="text" placeholder="Address Line 1" {...register("addressLine1", { required: true })} className="input" />
            {/* {errors.addressLine1?.type === 'required' && "Address is required"} */}

            <input type="text" placeholder="City" {...register("cityLocality", { required: true })} className="input" />
            {/* {errors.cityLocality?.type === 'required' && "City is required"} */}

            <StateSelect register={register} />

            <input type="text" placeholder="Zip" {...register("postalCode", { required: true })} className="input" />
            {/* {errors.postalCode?.type === 'required' && "Zip code is required"} */}

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

            <input type="submit" className="btn col-span-2 mt-10" />
        </form>
    )
}

export default ShippingForm