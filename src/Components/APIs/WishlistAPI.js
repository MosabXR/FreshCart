import baseURL from "./BaseURL";
import token from "./UserToken";
import axios from "axios";

const getUserWishlistAPI = async () => {
    const { data } = await axios.get(`${baseURL}/wishlist`, { headers: { token } });
    return data;
}

const addProductToWishlistAPI = async productId => {
    const { data } = await axios.post(`${baseURL}/wishlist`, { productId }, { headers: { token } });
    return data;
}

const removeProductFromWishlistAPI = async productId => {
    const { data } = await axios.delete(`${baseURL}/wishlist/${productId}`, { headers: { token } });
    return data;
}

export { getUserWishlistAPI, addProductToWishlistAPI, removeProductFromWishlistAPI }