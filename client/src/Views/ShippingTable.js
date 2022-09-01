import { useLocation } from "react-router-dom"

const ShippingTable = (props) => {
    const location = useLocation() //gets the state of packages from the estimate page
    const isRates = location.state.packages[0].hasOwnProperty('rateId')
    const packages = location.state.packages


    const PackageRow = ({shipment}) => {//The sdk and the api return camelCase and underscore respectively
        if (isRates) {
            return (
                
                <tr>
                    <td>{shipment.serviceType}</td>
                    <td>${shipment.shippingAmount.amount.toFixed(2)}</td>
                    <td>{shipment.deliveryDays ?? 'N/A'}</td>
                    <td>{shipment.estimatedDeliveryDate ? shipment.estimatedDeliveryDate.substring(0,10) : 'N/A'}</td>
                    <td>{shipment.trackable ? 'yes' : 'no'}</td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{shipment.service_type}</td>
                    <td>${shipment.shipping_amount.amount.toFixed(2)}</td>
                    <td>{shipment.delivery_days}</td>
                    <td>{shipment.estimated_delivery_date.substring(0,10)}</td>
                    <td>{shipment.trackable ? 'yes' : 'no'}</td>
                </tr>
            )
        }

        // return (
        //     <tr>
        //         <td>{shipment.serviceType ?? shipment.service_type}</td>
        //         <td>${shipment.shippingAmount ? shipment.shippingAmount.amount.toFixed(2) : shipment.shipping_amount.amount.toFixed(2)}</td>
        //         <td>{shipment.deliveryDays ?? shipment.delivery_days}</td>
        //         <td>{(shipment.estimatedDeliveryDate ?? shipment.estimated_delivery_date).substring(0,10)}</td>
        //         <td>{shipment.trackable ? 'yes' : 'no'}</td>

        //         { shipment.rateId &&  
        //             <td>
        //                 <input type="" className="btn"/>
        //             </td>
        //         }
                
        //     </tr>
        // )
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
                        {

                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        packages.map(
                            (shipment, idx) => {
                                return <PackageRow key={idx} shipment={shipment}/>
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ShippingTable