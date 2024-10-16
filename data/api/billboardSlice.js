import { generalApiSlice } from "./baseApiSlice";
export const billboardApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPopularBillboards: builder.query({
      // doesnt work yet
      query: (data) => ({
        url: "/billboard/popular",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),

    getABillboard: builder.query({
      query: (data) => ({
        url: `/billboard/${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    createNew: builder.mutation({
      query: (data) => ({
        url: "/billboard/new",
        body: data.body,
        method: "POST",
        headers: { Authorization: `Bearer ${data.token}` },
      }),
    }),
    getBillboards: builder.query({
      query: (data) => ({
        url: "/billboard/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    getBillboardsByUser: builder.query({
      query: (data) => {
        console.log(data);
        return {
        url: `/billboards/user/${data.id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      }},
    }),
    getBillboardsInMarketPlace: builder.query({
      query: (data) => ({
        url: `/page/marketplace`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
    })
  }),
});

export const { useGetHomeQuery, useCreateNewMutation, useGetBillboardsByUserQuery, useGetBillboardsInMarketPlaceQuery } = billboardApiSlice;
