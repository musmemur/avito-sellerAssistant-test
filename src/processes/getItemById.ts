import {api} from "../app/axiosInstance.ts";
import type {ItemUpdateIn} from "../entities";

export const getItemById = async (id: string): Promise<ItemUpdateIn> => {
    const response = await api.get(`/items/${id}`);
    return response.data.items[0];
};