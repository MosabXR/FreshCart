import baseURL from "./BaseURL";
import axios from "axios";

const getAllProductsAPI = async (type,id) => {
    let { data } = await axios.get(`${baseURL}/products${type==`brand`?id?`?brand=${id}`:``:type==`category`? id ?`?category[in]=${id}`:``:``}`);
    return data;
}

const getAllProductsCustomAPI = async api => {
    let { data } = await axios.get(`${baseURL}${api}`);
    return data;
}

const getProductAPI = async productId => {
    const { data } = await axios.get(`${baseURL}/products/${productId}`);
    return data;
}

export { getAllProductsAPI, getProductAPI, getAllProductsCustomAPI }