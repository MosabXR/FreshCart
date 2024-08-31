import baseURL from './BaseURL'
import axios from 'axios';

// Sign in API

const signInAPI = async values => {
    const { data } = await axios.post(`${baseURL}/auth/signin`, values);
    return data;
}

// Sign up API

const signUpAPI = async values => {
    const { data } = await axios.post(`${baseURL}/auth/signup`, values);
    return data;
}

const forgotPasswordAPI = async email => {
    const { data } = await axios.post(`${baseURL}/auth/forgotPasswords`, email);
    return data;
}

const updatePasswordAPI = async values => {
    const { data } = await axios.put(`${baseURL}/auth/resetPassword`, values);
    return data;
}

const resetCodeAPI = async resetCode => {
    const { data } = await axios.post(`${baseURL}/auth/verifyResetCode`, resetCode);
    return data;
}

export { signInAPI, signUpAPI, forgotPasswordAPI, resetCodeAPI, updatePasswordAPI };