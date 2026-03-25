import {api} from "../app/axiosInstance.ts";
import type {AllItemParams, ItemUpdateIn} from "../entities";

type DataType = Omit<ItemUpdateIn, 'needsRevision' | 'createdAt' | 'params'> & AllItemParams

export const improveDescription = async (data: DataType): Promise<string> => {
    const res = await api.post('/llm/improve-description', data);
    return res.data.text;
};