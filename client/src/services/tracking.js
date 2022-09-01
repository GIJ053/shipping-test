import axios from "axios"

export const displayTracking = async (trackingInfo) => {
    const response = await axios.post(`/api/display-tracking/${trackingInfo.carrierCode}/${trackingInfo.trackingNumber}`)
    return response.data
}