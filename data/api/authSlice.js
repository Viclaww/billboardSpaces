import { generalApiSlice } from "./baseApiSlice";
export const authApiSlice = generalApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ access, data, id }) => ({
        url: `/auth/user/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "auth/password/reset",
        method: "POST",
        body: data,
      }),
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "auth/verifyOTP",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "auth/password/change",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useVerifyOTPMutation,
} = authApiSlice;
