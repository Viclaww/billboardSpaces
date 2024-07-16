import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseQuery = fetchBaseQuery({
  baseUrl: "",
});
export const generalApiSlice = createApi({
  baseQuery,
  tagTypes: ["User", 'BillBoards'],
  endpoints: (builder) => ({}),
});
