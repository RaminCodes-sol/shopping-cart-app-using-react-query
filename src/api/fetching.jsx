import axios from "axios"


export const fetchProducts = async () => {
    return axios.get('https://dummyjson.com/products').then(res => res.data.products)
}

export const fetchProduct = async (id) => {
    return axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data)
}