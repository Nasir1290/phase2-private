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
    getAllPromotions: build.query({
      query: () => {
        return {
          url: `/promotion/all`,
          method: "GET",
        };
      },
      providesTags: ["Subscription"],
    }),
    // purchasePromotion:build.mutation
    purchasePromotion:build.mutation({
      query: (data) => {
        return {
          url: "/promotion/checkout",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Promotion"],
    }),
    applyPromotionFromWallet:build.mutation({
      query: (data) => {
        return {
          url: "/promotion/apply-wallet",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Promotion"],
    })
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useGetAllPromotionsQuery,
  usePurchasePromotionMutation,
  useApplyPromotionFromWalletMutation
} = subscriptionApi;
