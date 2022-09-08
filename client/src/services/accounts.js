import axios from "axios"

export const createStripeAccount = async () => {
    const response = await axios.post('/api/create-stripe')
    return response.data
}

export const createStripeLink = async () => {
    const response = await axios.post('/api/link-stripe')
    return response.data
}

export const connectAccount = async () => {
    const res = await axios.post('/api/create-stripe')
    console.log('Creating Account');

    const res2 = await axios.post('/api/link-stripe', { account: res.data })
    console.log('Linking Account');

    return res2.data
}