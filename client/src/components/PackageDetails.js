export const PackageDetails = (props) => {
    return (
        <div>
            <input type="text" placeholder="Enter Weight" className="input w-full max-w-xs" {...props.register("value")}/>

            <div className="form-control w-full max-w-xs pt-1">
                <select defaultValue={'DEFAULT'} {...props.register("unit")} className="select w-full max-w-xs">
                    <option disabled value="DEFAULT">Pick one</option>
                    <option value="ounce">Ounces</option>
                    <option value="pound">Pounds</option>
                    <option value="gram">Grams</option>
                    <option value="kilogram">Kilograms</option>
                </select>
            </div>
        </div>
    )
}