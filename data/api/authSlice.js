import { generalApiSlice } from "./baseApiSlice";
// console.log(generalApiSlice);
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
    getProfile: builder.query({
      query: ({ access }) => ({
        url: `/auth/user/profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }),
    }),
    updateUser: builder.mutation({
      query: ({ access, data }) => ({
        url: `/auth/profile/update`,
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
        url: "auth/verify-otp",
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
  useGetProfileQuery,
} = authApiSlice;
