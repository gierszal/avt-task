import { api } from "./api.ts"

export interface GetAdsParams {
    skip?: number;
    limit?: number;
    q?: string;
    needsRevision?: boolean;
    categories?: string | string[];
    sortColumn?: 'title' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
}

export const AdsApi = {
    getAds: async (params: GetAdsParams = {}) => {

        const { categories, ...restParams } = params;

        const requestParams: Record<string, any> = { ...restParams };

        if (categories) {
            requestParams.categories = Array.isArray(categories)
                ? categories.join(',')
                : categories;
        }

        const res = await api.get('/items', { params: requestParams });
        const items = res.data;
        const total: number = res.headers["x-total-count"] ?? 0;

        return { items, total };
    },

    getAd: async (id: string|undefined) => {
        return await api.get(`/items/${id}`);
    },

    updateAd: async (id:string|undefined, updatedData:any)=> {

        return await api.put(`/items/${id}`, updatedData);
    },

    askAI: async (topic: string, item:any)=> {
        let prompt:string = "";

        if (topic === "description"){
            prompt = `Вот данные о предмете: ${JSON.stringify(item)}. Язык - русский! Очень коротко изложи его описание так, чтобы его хотели купить. Максимально - 100 символов, но желательно меньше.`;
        } else if(topic == "price"){
            prompt = `Вот данные о предмете: ${JSON.stringify(item)}. Язык - русский! Очень коротко изложи его рыночную стоимость, без лишних комментариев - цена для данного или подобного состояния и тп. Но очень коротко! Максимум 2-3 предложения небольших!`;
        } else return null;

        return await api.post(`/llm`, {prompt: prompt}, {headers: {'Content-Type' : 'application/json'}});
    }
};