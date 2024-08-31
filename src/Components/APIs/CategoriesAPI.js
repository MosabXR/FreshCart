import baseURL from "./BaseURL";
import axios from "axios";

const getAllCategoriesAPI = async () => {
    const { data } = await axios.get(`${baseURL}/categories`);
    return data;
}

export { getAllCategoriesAPI }