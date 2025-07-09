import { TQuery } from "@/types/global";
import { baseApi } from "./baseApi";
import buildSearchQuery from "@/utils/buildSearchQuery";

const carApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //create car --pending
    createCar: build.mutation({
      query: (formData) => {
        return {
          url: "/car/create",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Car"],
    }),
    // get all accepted cars --done
    getAllAcceptedCar: build.query({
      query: (arg: TQuery[]) => {
        const params = buildSearchQuery(arg);
        return {
          url: `/car/all`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Car"],
    }),
    // get all pending cars --done
    getAllPendingCar: build.query({
      query: (arg: TQuery[]) => {
        const params = buildSearchQuery(arg);
        return {
          url: `/car/all-pending`,
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Car"],
    }),
    // get All Vehicle Owners --done
    getAllCarOwners: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (query:string|any) => ({
        url: `/car/owners?${query}`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
    // get car details by id --done
    getCarByID: build.query({
      query: (id) => ({
        url: `/car/single/${id}`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
    // Get Car Owner Details by id --done
    getCarOwnerByID: build.query({
      query: (arg: TQuery[]) => {
        const userId = arg.find((item) => item.name === "userId")?.value; // Extract userId from the array
        const params = buildSearchQuery(
          arg.filter((item) => item.name !== "userId")
        );
        return {
          url: `/car/owner-cars/${userId}`, // Use userId in the URL
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Car"],
    }),
    // Accept / Reject Car --done
    acceptCar: build.mutation({
      query: ({ id, token, acceptanceStatus }) => ({
        url: `/car/update-acceptance-status/${id}`,
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: {
          acceptanceStatus: acceptanceStatus,
        },
      }),
      invalidatesTags: ["Car"],
    }),
    // update car type(POPULAR, BEST_OFFER, NORMAL) --done
    updateCarType: build.mutation({
      query: ({ id, token, carType }) => ({
        url: `/car/update-type/${id}`,
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: {
          carType: carType,
        },
      }),
      invalidatesTags: ["Car"],
    }),
    // Update car status (ACTIVE, SUSPENDED) --done
    updateCarStatus: build.mutation({
      query: ({ id, token, carStatus }) => ({
        url: `/car/update/${id}`,
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: {
          carStatus: carStatus,
        },
      }),
      invalidatesTags: ["Car"],
    }),
    // Delete single car --done
    deleteCar: build.mutation({
      query: ({ id }) => ({
        url: `/car/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
    // get all categories --done
    getAllCategories: build.query({
      query: () => ({
        url: `/car/all-categories`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
    // get all brands --done
    getAllBrands: build.query({
      query: () => ({
        url: `/car/all-brand`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),

    updateCarDetails: build.mutation({
      query: ({ id, data }) => ({
        url: `/car/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Car"],
    }),

    bookCar: build.mutation({
      query: (data) => ({
        url: `/car-booking/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Car"],
    }),
    getAllCarsWithSuspended: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (query:string|any) => ({
        url: `/car/all-with-suspended?${query}`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),

    getAllCarByTypes: build.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      query: (query:string|any) => ({
        url: `/car/all?${query}`,
        method: "GET",
      }),
      providesTags: ["Car"],
    }),
  }),
});

export const {
  useCreateCarMutation,
  useGetAllAcceptedCarQuery,
  useGetAllPendingCarQuery,
  useGetAllCarOwnersQuery,
  useGetCarOwnerByIDQuery,
  useGetCarByIDQuery,
  useAcceptCarMutation,
  useUpdateCarTypeMutation,
  useUpdateCarStatusMutation,
  useDeleteCarMutation,
  useGetAllCategoriesQuery,
  useGetAllBrandsQuery,
  useUpdateCarDetailsMutation,
  useBookCarMutation,
  useGetAllCarsWithSuspendedQuery,
  useGetAllCarByTypesQuery,
} = carApi;
