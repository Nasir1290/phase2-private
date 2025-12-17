// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { useGetAllCarOwnersQuery } from "@/redux/api/carApi";
// import { useState } from "react";

// const VehicleOwners = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const { data: carOwners } = useGetAllCarOwnersQuery(`page=${currentPage}&limit=10`);
//   const ownerData = carOwners?.data?.owners;
//   console.log(carOwners)
//   return (
//     <div className="px-4 py-8">
//       {/* Page Header */}
//       <div className="mt-10 md:mt-0 mb-12 md:mb-16 space-y-5">
//         <div className="flex flex-col items-start gap-5">
//           <h2 className="text-primary font-extrabold text-3xl md:text-[30px] uppercase">
//             Vehicle Owners
//           </h2>
//           <p className="text-black text-base font-medium max-w-[1100px] ">
//             View all the vehicle owners and their owned cars and their current
//             status
//           </p>
//         </div>
//         <div>
//           <Separator className="mt-10 mb-20 w-2/3" />
//         </div>
//       </div>

//       {/* Table Container */}
//       <div className="overflow-x-auto">
//         <Table className="w-full rounded-lg shadow-md">
//           {/* Table Header */}
//           <TableHeader className="">
//             <TableRow>
//               <TableHead className="text-text_light_gray p-3">ID</TableHead>
//               <TableHead className="text-text_light_gray p-3">
//                 First Name
//               </TableHead>
//               <TableHead className="text-text_light_gray p-3">
//                 Last Name
//               </TableHead>
//               <TableHead className="text-text_light_gray p-3 hidden md:table-cell">
//                 Email
//               </TableHead>
//               <TableHead className="text-text_light_gray p-3 hidden lg:table-cell">
//                 Phone
//               </TableHead>
//               {/* <TableHead className="text-text_light_gray p-3 text-center">
//                 Actions
//               </TableHead> */}
//               <TableHead className="text-text_light_gray p-3 text-center">
//                 Details
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           {/* Table Body */}
//           <TableBody>
//             {ownerData?.map((user: any, index: number) => (
//               <TableRow key={index} className="border-t">
//                 <TableCell className="text-sm p-3 text-text_dark_gray font-semibold ">
//                   {index + 1}
//                 </TableCell>
//                 <TableCell className="text-sm p-3 text-black">
//                   {user?.firstName}
//                 </TableCell>
//                 <TableCell className="text-sm p-3 text-black">
//                   {user?.lastName}
//                 </TableCell>
//                 <TableCell className="text-sm p-3 text-black">
//                   {user?.email}
//                 </TableCell>
//                 <TableCell className="text-sm p-3 text-black">
//                   {user?.phoneNumber}
//                 </TableCell>
//                 {/* <TableCell className="text-sm p-3 text-black flex justify-center gap-5">
//                   <button onClick={() => handleDelete(user?.id)} className="">
//                     <Trash2
//                       size={18}
//                       className="text-primary hover:text-gray-500"
//                     />
//                   </button>
//                 </TableCell> */}
//                 <TableCell className="text-sm p-3 text-black underline text-center hover:font-medium hover:text-primary">
//                   <Link href={`/dashboard/vehicle-owners/${user?.id}`}>
//                     Details
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default VehicleOwners;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useGetAllCarOwnersQuery } from "@/redux/api/carApi";
import { useState } from "react";

const VehicleOwners = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: carOwners } = useGetAllCarOwnersQuery(`page=${currentPage}&limit=10`);
  const ownerData = carOwners?.data?.owners;
  const meta = carOwners?.data?.meta;

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
          className={`mx-1 px-3 py-1 rounded ${currentPage === i ? "bg-primary text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="px-4 py-8">
      {/* Page Header */}
      <div className="mt-10 md:mt-0 mb-12 md:mb-16 space-y-5">
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-primary font-extrabold text-3xl md:text-[30px] uppercase">Vehicle Owners</h2>
          <p className="text-black text-base font-medium max-w-[1100px] ">
            View all the vehicle owners and their owned cars and their current status
          </p>
        </div>
        <div>
          <Separator className="mt-10 mb-20 w-2/3" />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <Table className="w-full rounded-lg shadow-md">
          {/* Table Header */}
          <TableHeader className="">
            <TableRow>
              <TableHead className="text-text_light_gray p-3">ID</TableHead>
              <TableHead className="text-text_light_gray p-3">First Name</TableHead>
              <TableHead className="text-text_light_gray p-3">Last Name</TableHead>
              <TableHead className="text-text_light_gray p-3 hidden md:table-cell">Email</TableHead>
              <TableHead className="text-text_light_gray p-3 hidden lg:table-cell">Phone</TableHead>
              <TableHead className="text-text_light_gray p-3 text-center">Details</TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {ownerData?.map((user: any, index: number) => (
              <TableRow key={index} className="border-t">
                <TableCell className="text-sm p-3 text-text_dark_gray font-semibold ">{index + 1}</TableCell>
                <TableCell className="text-sm p-3 text-black">{user?.firstName}</TableCell>
                <TableCell className="text-sm p-3 text-black">{user?.lastName}</TableCell>
                <TableCell className="text-sm p-3 text-black">{user?.email}</TableCell>
                <TableCell className="text-sm p-3 text-black">{user?.phoneNumber}</TableCell>
                <TableCell className="text-sm p-3 text-black underline text-center hover:font-medium hover:text-primary">
                  <Link href={`/dashboard/vehicle-owners/${user?.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-600"
          }`}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === meta?.totalPage}
          className={`px-4 py-2 rounded ${
            currentPage === meta?.totalPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VehicleOwners;
