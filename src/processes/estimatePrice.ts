import {api} from "../app/axiosInstance.ts";
import type {AllItemParams, ItemUpdateIn} from "../entities";

type DataType = Omit<ItemUpdateIn, 'needsRevision' | 'createdAt' | 'params'> & AllItemParams

export const estimatePrice = async (data: DataType): Promise<string> => {
    const res = await api.post('/llm/estimate-price', data);
    return res.data.price;
};