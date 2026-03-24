import {api} from "../app/axiosInstance.ts";
import type {ItemsGetOut} from "../entities";

export const getItems = async (params: any): Promise<ItemsGetOut> => {
    const response = await api.get('/items', {
        params: {
            q: params.q,
            limit: params.limit,
            skip: params.skip,
            needsRevision: params.needsRevision,
            categories: params.categories,
            sort: params.sort
        },
    });

    return response.data;
};