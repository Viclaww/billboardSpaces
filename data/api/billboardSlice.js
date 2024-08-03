import { generalApiSlice } from "./baseApiSlice";
export const authApiSlice = generalApiSlice.injectEndpoints({
  endpoint: (builder) => ({
    getNewBillboards: builder.query({
      query: (token) => ({
        url: "/billboard/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getPopularBillboards: builder.query({
      // doesnt work yet

      query: (token) => ({
        url: "/billboard/popular",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getABillboard: builder.query({
      query: (token, id) => ({
        url: `/billboard/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getBillboards: builder.query({
      query: (token) => ({
        url: "/billboard/list",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
