import { generalApiSlice } from "./baseApiSlice";
console.log(generalApiSlice);
console.log("reddington");
export const billboardApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNewBillboard: builder.query({
      query: (data) => ({
        url: "/billboard/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
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
  }),
});

export const { useGetNewBillboardQuery, useCreateNewMutation } =
  billboardApiSlice;
