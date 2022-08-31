import axios from "axios"

const basePath = '/api/rates'

export const getRates = async (userInput) => {
    const response = await axios.post(basePath, { userInput })
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