import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "https://billboard-api-1.onrender.com/api/v1",
});
export const generalApiSlice = createApi({
  baseQuery,
  // tagTypes: ["User", "BillBoards"],
  endpoints: (builder) => ({
    getHome: builder.query({
      query: (data) => ({
        url: "/page/home",
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
  }),
});
