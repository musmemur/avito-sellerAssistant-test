import {api} from "../app/axiosInstance.ts";

export const estimatePrice = async (data) => {
    const res = await api.post('/llm/estimate-price', data);
    return res.data.price;
};