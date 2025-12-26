import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create subscription --done
    createSubscription: build.mutation({
      query: (data) => {
        return {
          url: "/subscription/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Subscription"],
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

export const { useCreateSubscriptionMutation, useGetAllSubscriptionsQuery } = subscriptionApi;
