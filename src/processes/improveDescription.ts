import {api} from "../app/axiosInstance.ts";

export const improveDescription = async (data) => {
    const res = await api.post('/llm/improve-description', data);
    return res.data.text;
};