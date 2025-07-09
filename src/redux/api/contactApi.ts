import { baseApi } from "./baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create contact --done
    createContact: build.mutation({
      query: (data) => {
        return {
          url: "/contact/send-email",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useCreateContactMutation } = carApi;
