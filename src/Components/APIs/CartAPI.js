import baseURL from "./BaseURL";
import token from "./UserToken";
import axios from "axios";

const getUserCartAPI = async () => {
    const { data } = await axios.get(`${baseURL}/cart`, { headers: { token } });
    return data;
}

const addProductToCartAPI = async (productId, token) => {
    const { data } = await axios.post(`${baseURL}/cart`, { productId }, { headers: { token } });
    return data;
}

const updateCartProductQuantityAPI = async (productId, count, token) => {
    const { data } = await axios.put(`${baseURL}/cart/${productId}`, { count }, { headers: { token } });
    return data;
}

const removeCartItemAPI = async (productId, token) => {
    const { data } = await axios.delete(`${baseURL}/cart/${productId}`, { headers: { token } });
    return data;
}

export { getUserCartAPI, addProductToCartAPI, updateCartProductQuantityAPI, removeCartItemAPI }
