import {api} from "../app/axiosInstance.ts";
import type {ItemUpdateIn} from "../entities";

export const updateItem = async (id: string, data: ItemUpdateIn): Promise<ItemUpdateIn> => {
    const response = await api.put(`/items/${id}`, data);
    console.log(response.data)
    return response.data;
};