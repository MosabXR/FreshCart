import baseURL from "./BaseURL";
import axios from "axios";

const getUserWishlistAPI = async (token) => {
    const { data } = await axios.get(`${baseURL}/wishlist`, { headers: { token } });
    return data;
}

const addProductToWishlistAPI = async (productId,token) => {
    const { data } = await axios.post(`${baseURL}/wishlist`, { productId }, { headers: { token } });
    return data;
}

const removeProductFromWishlistAPI = async (productId,token) => {
    const { data } = await axios.delete(`${baseURL}/wishlist/${productId}`, { headers: { token } });
    return data;
}

export { getUserWishlistAPI, addProductToWishlistAPI, removeProductFromWishlistAPI }
