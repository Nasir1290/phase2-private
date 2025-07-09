// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import img1 from "@/assets/fordtransit/main-image.jpeg";
// import user from "@/assets/user.jpg";
// import { useGetCarOwnerByIDQuery } from "@/redux/api/carApi";
// import { usePathname } from "next/navigation";
// import Loading from "@/components/shared/loading/Loading";
// import { useState } from "react";

// const VehicleOwnerDetails = () => {
//   const pathname = usePathname();
//   const [currentPage, setCurrentPage] = useState(1);
//   const vehiclesPerPage = 10;
//   const id = pathname?.split("/").pop();
//   // const { data: ownerDetails, isLoading, error } = useGetCarOwnerByIDQuery(id);
//   const {
//     data: ownerDetails,
//     isLoading,
//     error,
//   } = useGetCarOwnerByIDQuery([
//     { name: "userId", value: id },
//     { name: "page", value: currentPage },
//     { name: "limit", value: vehiclesPerPage },
//   ]);
//   console.log(ownerDetails)

//   // Handle loading state
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <h2 className="text-gray-500 text-lg font-semibold">
//           <Loading />
//         </h2>
//       </div>
//     );
//   }

//   // Handle error state
//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-40">
//         <h2 className="text-gray-600 text-lg font-semibold">
//           Unable to retrieve data for this owner. Please try again later.
//         </h2>
//       </div>
//     );
//   }

//   const cars = ownerDetails?.data?.cars || [];
//   const firstCar = cars[0];
//   const owner = firstCar?.owner;

//   return (
//     <div className="p-6 space-y-20">
//       {/* User Profile Section */}
//       {owner && (
//         <div className="flex items-start gap-10 mb-8">
//           <Image
//             src={user}
//             alt="User Profile Picture"
//             width={1000}
//             height={1000}
//             className="rounded-full w-32 h-32 object-cover"
//           />
//           <div className="space-y-2">
//             <h1 className="text-2xl font-bold">
//               {owner.firstName} {owner.lastName}
//             </h1>
//             <p className="text-text_light_gray font-medium">{owner.email}</p>
//             <p className="text-text_dark_gray">{owner.phoneNumber}</p>
//           </div>
//         </div>
//       )}

//       {/* Vehicles Added Section */}
//       <div className="space-y-8">
//         <h2 className="text-2xl font-medium mb-4">Inserted Vehicles</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {cars.map((vehicle: any) => (
//             <div
//               key={vehicle.id}
//               className="border rounded-lg p-4 shadow hover:shadow-lg hover:shadow-red/20 transition duration-300 ease-in-out"
//             >
//               <Link
//                 href={`/dashboard/vehicle-owners/${id}/${vehicle.id}`}
//                 className="space-y-4"
//               >
//                 <Image
//                   src={vehicle.mainImage || img1}
//                   alt={vehicle.model}
//                   width={400}
//                   height={300}
//                   className="w-full h-64 object-cover rounded-md"
//                 />
//                 <div>
//                   <h3 className="mt-2 hover:text-red font-medium text-lg">
//                     {vehicle.model}
//                   </h3>
//                   <p className="text-sm text-text_light_gray font-semibold">
//                     {vehicle.brand}
//                   </p>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleOwnerDetails;




/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import img1 from "@/assets/fordtransit/main-image.jpeg";
import user from "@/assets/user.jpg";
import { useGetCarOwnerByIDQuery } from "@/redux/api/carApi";
import { usePathname } from "next/navigation";
import Loading from "@/components/shared/loading/Loading";
import { useState } from "react";

const VehicleOwnerDetails = () => {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 12;
  const id = pathname?.split("/").pop();
  const {
    data: ownerDetails,
    isLoading,
    error,
  } = useGetCarOwnerByIDQuery([
    { name: "userId", value: id },
    { name: "page", value: currentPage },
    { name: "limit", value: vehiclesPerPage },
  ]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <h2 className="text-gray-500 text-lg font-semibold">
          <Loading />
        </h2>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <h2 className="text-gray-600 text-lg font-semibold">
          Unable to retrieve data for this owner. Please try again later.
        </h2>
      </div>
    );
  }

  const cars = ownerDetails?.data?.cars || [];
  const meta = ownerDetails?.data?.meta;
  const firstCar = cars[0];
  const owner = firstCar?.owner;

  // Pagination handler
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= (meta?.totalPage || 1)) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers
  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = meta?.totalPage || 1;
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i
              ? "bg-red text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="p-6 space-y-20">
      {/* User Profile Section */}
      {owner && (
        <div className="flex items-start gap-10 mb-8">
          <Image
            src={user}
            alt="User Profile Picture"
            width={1000}
            height={1000}
            className="rounded-full w-32 h-32 object-cover"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {owner.firstName} {owner.lastName}
            </h1>
            <p className="text-text_light_gray font-medium">{owner.email}</p>
            <p className="text-text_dark_gray">{owner.phoneNumber}</p>
          </div>
        </div>
      )}

      {/* Vehicles Added Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-medium mb-4">Inserted Vehicles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cars.map((vehicle: any) => (
            <div
              key={vehicle.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg hover:shadow-red/20 transition duration-300 ease-in-out"
            >
              <Link
                href={`/dashboard/vehicle-owners/${id}/${vehicle.id}`}
                className="space-y-4"
              >
                <Image
                  src={vehicle.mainImage || img1}
                  alt={vehicle.model}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-md"
                />
                <div>
                  <h3 className="mt-2 hover:text-red font-medium text-lg">
                    {vehicle.model}
                  </h3>
                  <p className="text-sm text-text_light_gray font-semibold">
                    {vehicle.brand}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red text-white hover:bg-red-600"
            }`}
          >
            Previous
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === meta?.totalPage}
            className={`px-4 py-2 rounded ${
              currentPage === meta?.totalPage
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red text-white hover:bg-red-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleOwnerDetails;