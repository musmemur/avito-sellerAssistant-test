import {api} from "../app/axiosInstance.ts";

export const getItemById = async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
};