import { generalApiSlice } from "./baseApiSlice";

export const adApiSlice = generalApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPopularAds: builder.query({
            query: (data) => ({
                url: "/ad/popular",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
        getAnAd: builder.query({
            query: (data) => ({
                url: `/ad/${data.id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
        createNewAd: builder.mutation({
            query: (data) => ({
                url: "/advertisements",
                body: data.body,
                method: "POST",
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: [{ type: 'Ads', id: 'LIST' }]
        }),
        getAds: builder.query({
            query: (data) => ({
                url: "/ad/list",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
        getAdsByUser: builder.query({
            query: (data) => ({
                url: `/ads/user/${data.id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
        getAdsInMarketPlace: builder.query({
            query: (data) => ({
                url: `/page/advertisements`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
                
            }),
        }),
    }),
});

export const {
    useGetPopularAdsQuery,
    useGetAnAdQuery,
    useCreateNewAdMutation,
    useGetAdsQuery,
    useGetAdsByUserQuery,
    useGetAdsInMarketPlaceQuery,
} = adApiSlice;