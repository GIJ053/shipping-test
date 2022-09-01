import { useLocation } from 'react-router-dom'

export const DisplayTracking = () => {
    const location = useLocation()
    const trackingInfo = location.state.trackingInfo
    const events = trackingInfo.events

    const EventRow = ({event}) => (
        <tr>
            <td>{event.cityLocality} {event.stateProvince}</td>
            <td>{event.description}</td>
            <td>{event.occurredAt}</td>
        </tr>
    )

    const CurrentStatus = () => (
        <div className="h-3/4 flex flex-col justify-around bg-primary-content items-center">
            <div className='card card-side h-3/4 w-4/5 bg-base-100 shadow-xl'>
                <div className='w-1/4 flex flex-col'>
                    <div className='bg-red-500 basis-1/2'></div>
                    <div className='bg-blue-500 basis-1/2'></div>
                </div>

                <div className='card-body'>
                    <h2 className='cardTitle'>Testing</h2>

                    <p>Still Testing</p>

                </div>
            </div>
            {/* <div className="card w-4/5 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Card title!</h2>

                    <p>If a dog chews shoes whose shoes does he choose?</p>

                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div> */}

            <ul className="steps w-full mb-10">
                <li className="step">Not Yet In System</li>
                <li className="step">Accepted</li>
                <li className="step">In Transit</li>
                <li className="step">Delivered</li>
            </ul>
        </div>
    )

    return (
        <div className='h-full bg-base-200'>
            <CurrentStatus />

            <div className="overflow-x-auto mt-2">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className="bg-primary">Location</th>
                            <th className="bg-primary">Description</th>
                            <th className="bg-primary">Occurred At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            events.slice(0).reverse().map((event, idx) => {
                                return <EventRow key={idx} event={event}/>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}