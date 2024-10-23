import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://billboardspaces-api.onrender.com/api/v1",
});
export const generalApiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "BillBoards", "Ads"],
  endpoints: (builder) => ({
    getHome: builder.query({
      query: (data) => ({
        url: "/page/home",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: ["BillBoards"],
    }),
  }),
});
