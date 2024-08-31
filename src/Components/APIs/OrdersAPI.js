import baseURL from "./BaseURL";
import token from "./UserToken";
import axios from "axios";

const createCashOrderAPI = async (cartId, shippingAddress) => {
    const { data } = await axios.post(`${baseURL}/orders/${cartId}`, { shippingAddress }, { headers: { token } });
    return data;
}

const createOnlinePaymentAPI = async (cartId, shippingAddress) => {
    const { data } = await axios.post(`${baseURL}/orders/checkout-session/${cartId}?url=http://localhost:5173`, { shippingAddress }, { headers: { token } });
    return data;
}


export { createCashOrderAPI, createOnlinePaymentAPI }