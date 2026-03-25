import {api} from "../app/axiosInstance.ts";
import type {ItemsGetOut} from "../entities";

type ParamsProps = {
    q?: string,
    limit: number,
    skip: number,
    needsRevision: string,
    categories?: string,
    sort: string
}

export const getItems = async (params: ParamsProps): Promise<ItemsGetOut> => {
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