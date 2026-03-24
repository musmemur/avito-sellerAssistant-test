import {api} from "../app/axiosInstance.ts";

export const getItemById = async (id: string) => {
    const response = await api.get(`/items/${id}`);
    return response.data.items[0];
};