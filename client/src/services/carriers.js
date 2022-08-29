import axios from "axios"

const basePath = '/api/carriers'

export const getCarriers = async () => {
    const response = await axios.get(basePath)
    return response.data
}