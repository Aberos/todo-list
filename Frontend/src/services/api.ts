import axios from 'axios'

export default axios.create({
    baseURL: process.env.API_URL
});

export const getHeaderToken = () => {
    const token = localStorage.getItem('token');
    return { headers: { "Authorization": `Bearer ${token}` } };
}