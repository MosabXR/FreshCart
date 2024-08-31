import baseURL from "./BaseURL";
import axios from "axios";

const getAllBrandsAPI = async () => {
    const { data } = await axios.get(`${baseURL}/brands`);
    return data;
}

export { getAllBrandsAPI }