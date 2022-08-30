export const CarrierSelector = (props) => {
    return (
        <div className="p-2 bg-base-100 rounded-xl m-2">
            <div className="card w-full bg-primary-content">
                <div className="card-body">
                    <span>Please Select a Carrier</span>
                    <span>Current estimated ZIP: {props.timeZone}</span>
                </div>
            </div>

            <div className="btn-group w-full bg-primary-content rounded-xl p-2 mt-2">
                <input type="radio" value="se-2884143" name="options" data-title="USPS" onClick={props.handler} className="btn basis-1/3"/>
                <input type="radio" value="se-2884144" name="options" data-title="UPS" onClick={props.handler} className="btn basis-1/3"/>
                <input type="radio" value="se-2884146" name="options" data-title="FedEx" onClick={props.handler} className="btn basis-1/3"/>
            </div>
        </div>
    )
}
