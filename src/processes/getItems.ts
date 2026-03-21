import {api} from "../app/axiosInstance.ts";

export const getItems = async (params = {}) => {
    const response = await api.get('/items', {
        params: {
            q: params.q,
            limit: params.limit,
            skip: params.skip,
            needsRevision: params.needsRevision,
            categories: params.categories, // "auto,electronics"
            sortColumn: params.sortColumn, // "title" | "createdAt"
            sortDirection: params.sortDirection, // "asc" | "desc"
        },
    });

    return response.data;
};