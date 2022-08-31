import { useLocation } from "react-router-dom"

const ShippingTable = (props) => {
    const location = useLocation() //gets the state of packages from the estimate page
    const packages = location.state.packages

    const PackageRow = ({shipment}) => {//The sdk and the api return camelCase and underscore respectively, used nullish operator cause don't feel like fixing it right now
        return (
            <tr>
                <td>{shipment.serviceType ?? shipment.service_type}</td>
                <td>${shipment.shippingAmount ? shipment.shippingAmount.amount : shipment.shipping_amount.amount}</td>
                <td>{shipment.deliveryDays ?? shipment.delivery_days}</td>
                <td>{(shipment.estimatedDeliveryDate ?? shipment.estimated_delivery_date).substring(0,10)}</td>
                <td>{shipment.trackable ? 'yes' : 'no'}</td>
                
            </tr>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <td>Service Type</td>
                        <td>Cost</td>
                        <td>Days to Deliver</td>
                        <td>Estimated Delivery Date</td>
                        <td>Trackable</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        packages.map(
                            (shipment, idx) => {
                                console.log(shipment)
                                return <PackageRow key={idx} shipment={shipment}/>
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShippingTable