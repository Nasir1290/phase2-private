import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
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
     getAllSubscriptions: build.query({
          query: () => {
            return {
              url: `/subscription/get-all`,
              method: "GET",
            };
          },
          providesTags: ["Subscription"],
        }),
  }),
});

export const { useCreateContactMutation , 
useGetAllSubscriptionsQuery
} = subscriptionApi;
