/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //register --done
    createUser: build.mutation({
      query: (data: any) => {
        return {
          url: `/user/register`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // login --done
    login: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // email verify --done
    verifyUser: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/otp-enter`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // forgotten password --done
    forgotPassword: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    //reset password --done
    resetPassword: build.mutation({
      query: ({ token, data }: { token: string; data: any }) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // logout user --done
    logout: build.mutation({
      query: () => {
        return {
          url: `/auth/logout`,
          method: "POST",
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // get me --done
    getMyProfile: build.query({
      query: () => ({
        url: `/auth/get-me`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    // change Password --done
    changePassword: build.mutation({
      query: (data: any) => {
        return {
          url: `/auth/change-password`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Delete Profile --done
    deleteProfile: build.mutation({
      query: (token) => {
        return {
          url: `/user`,
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Update Profile --done
    updateProfile: build.mutation({
      query: (formdata: any) => {
        return {
          url: `/user/update-me`,
          method: "PATCH",
          body: formdata,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Remove profile picture --done
    removeProfilePicture: build.mutation({
      query: (token) => {
        return {
          url: `/user/remove-profile-pic`,
          method: "PATCH",
          headers: {
            Authorization: token,
          },
        };
      },

      invalidatesTags: ["Auth"],
    }),

    // get all users in search field --done
    getUsers: build.query({
      query: ({ searchTerm }: { searchTerm: string }) => ({
        url: `/user?searchTerm=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyUserMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetMyProfileQuery,
  useChangePasswordMutation,
  useDeleteProfileMutation,
  useUpdateProfileMutation,
  useRemoveProfilePictureMutation,
  useGetUsersQuery,
} = authApi;
