import {api} from "../app/axiosInstance.ts";

export const getItems = async (params: any) => {
    const response = await api.get('/items', {
        params: {
            q: params.q,
            limit: params.limit,
            skip: params.skip,
            needsRevision: params.needsRevision,
            categories: params.categories
        },
    });

    return response.data;
};