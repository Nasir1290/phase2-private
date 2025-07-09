/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import {
  useAcceptCarMutation,
  useGetAllPendingCarQuery,
} from "@/redux/api/carApi";
import { toast } from "sonner";
import Loading from "@/components/shared/loading/Loading";
import Pagination from "@/components/shared/pagination/Pagination";
import { useState } from "react";

const RequestedCars = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 10;

  const {
    data: pendingCars,
    isLoading,
    isError,
  } = useGetAllPendingCarQuery([
    {
      name: "page",
      value: currentPage,
    },
    {
      name: "limit",
      value: vehiclesPerPage,
    },
  ]);
  const totalPage = pendingCars?.meta?.totalPage || 0;

  const [updateCarStatus] = useAcceptCarMutation();

  // Handle loading and error states
  if (isLoading) {
    return <Loading />;
  }

  if (isError || !pendingCars) {
    return (
      <h2 className="text-gray-600 font-semibold text-lg">
        No cars available at the moment. Please add car first
      </h2>
    );
  }

  const handleApprove = async (id: string) => {
    try {
      // Send the update to "ACCEPTED" status
      const res = await updateCarStatus({
        id,
        acceptanceStatus: "ACCEPTED",
      }).unwrap();

      // Check if the response was successful
      if (res.success) {
        toast.success(res.message || "Car accepted successfully!");
      } else {
        toast.error(
          res.message || "Failed to accept the car. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Failed to update car status", error);

      // Display the error from the backend if available
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to accept the car. Please try again.");
      }
    }
  };

  const handleReject = async (id: string) => {
    try {
      // Send the update to "REJECTED" status
      const res = await updateCarStatus({
        id,
        acceptanceStatus: "REJECTED",
      }).unwrap();

      // Check if the response was successful
      if (res.success) {
        toast.success(res.message || "Car rejected successfully!");
      } else {
        toast.error(
          res.message || "Failed to reject the car. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Failed to update car status", error);

      // Display the error from the backend if available
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to reject the car. Please try again.");
      }
    }
  };

  return (
    <div className="px-4 py-8 overflow-x-auto">
      {/* Header */}
      <div className="mt-10 md:mt-0 mb-12 md:mb-16 space-y-5">
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-red font-extrabold text-3xl md:text-[30px] uppercase">
            Requested Vehicles
          </h2>
          <p className="text-black text-base font-medium max-w-[1100px] ">
            View all the requested cars and their current status
          </p>
        </div>
        <div>
          <Separator className="mt-10 mb-20 w-2/3" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm text-text_light_gray">
              Sl No
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Image
            </TableHead>

            <TableHead className="text-sm text-text_light_gray">
              Brand
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Model
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Category
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Seats
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Car Owner
            </TableHead>
            <TableHead className="text-sm text-text_light_gray">
              Details
            </TableHead>

            <TableHead className="text-sm text-text_light_gray">
              Status
            </TableHead>
            <TableHead className="text-sm text-text_light_gray text-start pl-20">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pendingCars.data?.map((car: any, index: number) => (
            <TableRow key={car.id}>
              <TableCell className="text-[15px] text-text_dark_gray font-semibold">
                {index + 1}.
              </TableCell>
              <TableCell>
                <Image
                  src={car?.mainImage}
                  alt={car?.model}
                  width={500}
                  height={500}
                  className="h-14 w-20 rounded object-cover"
                />
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray">
                {car?.brand}
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray">
                {car?.model}
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray">
                {car?.category}
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray">
                {car.seats}
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray">
                {car?.owner?.firstName} {car?.owner?.lastName}
              </TableCell>
              <TableCell className="text-[15px] text-text_dark_gray font-medium underline hover:text-red hover:cursor-pointer">
                <Link href={`/dashboard/requested-vehicles/${car?.id}`}>
                  View Details
                </Link>
              </TableCell>

              <TableCell
                className={
                  car?.acceptanceStatus === "PENDING"
                    ? "text-yellow-400 font-medium text-[15px]"
                    : "text-text_dark_gray font-medium text-[15px]"
                }
              >
                {car?.acceptanceStatus}
              </TableCell>
              <TableCell className="text-[15px] space-x-5 my-5 flex items-center text-center">
                <Link
                  href={`/dashboard/vehicle-edit/${car?.id}`}
                  className="x-4 py-1.5 rounded-md"
                >
                  <FaRegEdit
                    size={20}
                    className="text-black hover:text-red mr-2"
                  />
                </Link>
                <button
                  onClick={() => handleApprove(car.id)}
                  className="bg-green/90 text-white w-24 text-[14px] px-4 py-1.5 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(car.id)}
                  className="bg-red text-white w-24 text-[14px] px-4 py-1.5 rounded-md"
                >
                  Reject
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6">
        <Pagination
          totalPages={totalPage} // Use the dynamically fetched totalPage
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default RequestedCars;
