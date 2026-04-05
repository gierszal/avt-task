import {useQuery, keepPreviousData, useMutation, useQueryClient} from "@tanstack/react-query";
import {AdsApi, type GetAdsParams} from "../API/adsApi.ts";
import {message} from "antd";

export function useGetAds(params: GetAdsParams = {}){
    const { skip = 0, limit = 10, q, needsRevision, categories, sortColumn, sortDirection } = params;
    return useQuery({
        queryKey: ['items', { skip, limit, q, needsRevision, categories, sortColumn, sortDirection }],
        queryFn: () => AdsApi.getAds({skip, limit, q, sortDirection, sortColumn, needsRevision, categories}),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    })
}

export function useGetAd(id: string|undefined){
    return useQuery({
        queryKey: ['item', { id }],
        queryFn: () => AdsApi.getAd(id),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    })
}

export function useUpdateAd(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, updatedData}: {id:string|undefined, updatedData: any}) => AdsApi.updateAd(id, updatedData),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({queryKey: ["items"]});
            queryClient.invalidateQueries({queryKey: ["item", {id:variables.id}]});
            message.success('Объявление успешно обновлено!');
        },
        onError: (error: any) => {
            message.error(error?.message || 'Ошибка при обновлении!');
        },
    });
};

export function useAskAI(topic: string, item:any){
    return useQuery({
        queryKey: ['llm', { topic, id: item?.id }],
        queryFn: () => AdsApi.askAI(topic, item),
        staleTime: 5 * 60 * 1000,
        placeholderData: keepPreviousData,
    })
}
