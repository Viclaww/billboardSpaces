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
        url: `/billboards/${data.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    createNew: builder.mutation({
      query: (data) => ({
        url: "/billboards/new",
        body: data.body,
        method: "POST",
        headers: { Authorization: `Bearer ${data.token}` },
      }),
      invalidatesTags: ["BillBoards"],
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
    validateBooking: builder.mutation({
      query: (data) => ({
        url: "/billboards/book/validate",
        method: "POST",
        body: data.body,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    getBillboardsByUser: builder.query({
      query: (data) => {
        console.log(data);
        return {
          url: `/billboards/user-billboards`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        };
      },
    }),
    getBillboardsInMarketPlace: builder.query({
      query: (data) => ({
        url: `/page/marketplace`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      providesTags: ["BillBoards"],
    }),
  }),
});

export const {
  useGetHomeQuery,
  useCreateNewMutation,
  useGetBillboardsByUserQuery,
  useGetBillboardsInMarketPlaceQuery,
  useGetABillboardQuery,
  useValidateBookingMutation,
} = billboardApiSlice;
