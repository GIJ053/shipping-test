const CarrierSelector = (props) => {
    return (
        <div className="p-2 bg-primary-content rounded-xl m-2">
            <div className="card w-full bg-primary shadow-xl">
                <div className="card-body">
                    <span>Please Select a Carrier</span>

                </div>
            </div>

            <div className="btn-group w-full bg-primary-content rounded-xl p-2">
                <input type="radio" value="se-2884143" name="options" data-title="USPS" className="btn basis-1/3" />
                <input type="radio" value="se-2884144" name="options" data-title="UPS" className="btn basis-1/3" />
                <input type="radio" value="se-2884146" name="options" data-title="FedEx" className="btn basis-1/3" />
            </div>
        </div>
    )
}

export default CarrierSelector