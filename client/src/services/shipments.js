import axios from "axios"

export const getRates = async (userInput) => {
    const response = await axios.post('api/rates', { userInput })
    return response.data
}

export const getEstimate = async (location) => {
    const response = await axios.post('/api/estimate', {location})
    return response.data
}

export const getLabel = async (savedRate) => {
    const response = await axios.post('/api/printlabel', {savedRate})
    return response.data
}