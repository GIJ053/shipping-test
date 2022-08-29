import axios from "axios"

const basePath = '/api/rates'

export const getRates = async (address) => {
    const response = await axios.post(basePath, { address })
    return response.data
}