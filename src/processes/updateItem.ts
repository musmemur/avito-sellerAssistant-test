import {api} from "../app/axiosInstance.ts";

export const updateItem = async (id, data) => {
    const response = await api.put(`/items/${id}`, data);
    return response.data;
};