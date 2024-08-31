import baseURL from "./BaseURL";
import token from "./UserToken";
import axios from "axios";

const addAddressAPI = async address => {
    const { data } = await axios.post(`${baseURL}/addresses`, { address }, { headers: { token } });
    return data;
}

const getAddressesAPI = async () => {
    const { data } = await axios.get(`${baseURL}/addresses`, { headers: { token } });
    return data;
}

const getSpecificAddress = async addressId => {
    const { data } = await axios.get(`${baseURL}/addresses/${addressId}`, { headers: { token } });
    return data;
}

export { addAddressAPI, getAddressesAPI, getSpecificAddress }