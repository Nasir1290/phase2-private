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
import { LiaTrashSolid } from "react-icons/lia";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import {
  useDeleteCarMutation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useGetAllAcceptedCarQuery,
  useGetAllCarsWithSuspendedQuery,
  useUpdateCarStatusMutation,
  useUpdateCarTypeMutation,
} from "@/redux/api/carApi";
import ReactDOM from "react-dom";
import { toast } from "sonner";
import active from "@/assets/myVehicles/pulsante-attiva.svg";
import suspend from "@/assets/myVehicles/sospendere.svg";
import Loading from "@/components/shared/loading/Loading";
import Pagination from "@/components/shared/pagination/Pagination";

const AcceptedCars = () => {
  // const [cardsToShow, setCardsToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const vehiclesPerPage = 10;
  const {
    data: getAllCars,
    isLoading,
    error,
  } = useGetAllCarsWithSuspendedQuery(`page=${currentPage}&limit=${vehiclesPerPage}`);
  const acceptedCars = getAllCars?.data || [];
  const [updateCarType] = useUpdateCarTypeMutation();
  const [updateCarStatus] = useUpdateCarStatusMutation();
  const [deleteCar] = useDeleteCarMutation();

  const totalPage = getAllCars?.meta?.totalPage || 0;

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle loading and error
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <h2 className="text-gray-600 font-semibold text-lg">
        No cars available at the moment. Please accept car first
      </h2>
    );
  }

  const handleClick = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const handleAddToPopuler = async (id: string, currentType: string) => {
    // Toggle between "POPULAR" and "NORMAL"
    const newCarType = currentType === "POPULAR" ? "NORMAL" : "POPULAR";

    try {
      // If the car is "NORMAL", we don't pass a value for carType in the request.
      const res = await updateCarType({
        id,
        carType: newCarType, // Don't send value for "NORMAL"
      }).unwrap();

      if (res.success) {
        toast.success(
          res.message || `Car marked as ${newCarType} successfully!`
        );
      } else {
        toast.error(
          res.message || `Failed to update car type. Please try again.`
        );
      }
    } catch (error: any) {
      console.error("Failed to update car status", error);
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to update car type. Please try again.");
      }
    }
  };

  const handleAddToOffer = async (id: string, currentType: string) => {
    // Toggle the car type between "BEST_OFFER" and "NORMAL"
    const newCarType = currentType === "BEST_OFFER" ? "NORMAL" : "BEST_OFFER";

    try {
      const res = await updateCarType({
        id,
        carType: newCarType, // Send the toggled value to the API
      }).unwrap();

      if (res.success) {
        toast.success(
          res.message || `Car marked as ${newCarType} successfully!`
        );
      } else {
        toast.error(
          res.message || `Failed to update car type. Please try again.`
        );
      }
    } catch (error: any) {
      console.error("Failed to update car status", error);
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to update car type. Please try again.");
      }
    }
  };

  const handleUpdateCarStatus = async (id: string, carStatus: string) => {
    const newStatus = carStatus === "ACTIVE" ? "SUSPEND" : "ACTIVE";

    try {
      const res = await updateCarStatus({
        id,
        carStatus: newStatus,
      }).unwrap();

      // Use newStatus here to show the correct message
      if (res.success) {
        toast.success(`CAR ${newStatus}!`); // Update to newStatus
      } else {
        toast.error(
          res.message ||
            `Failed to update car status to ${carStatus}. Please try again.`
        );
      }
    } catch (error: any) {
      console.error("Failed to update car status", error);
      toast.error(
        error?.data?.message || `Failed to update car status. Please try again.`
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCar({
        id,
      }).unwrap();

      if (res.success) {
        toast.success(res.message || `Car deleted successfully!`);
      } else {
        toast.error(res.message || `Failed to delete car. Please try again.`);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || `Failed to delete car. Please try again.`
      );
    }
  };

  return (
    <div className="px-4 py-8 overflow-x-auto relative">
      {/* Header  */}
      <div className="mt-10 md:mt-0 mb-12 md:mb-16 space-y-5">
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-red font-extrabold text-3xl md:text-[30px] uppercase">
            Accepted Vehicles
          </h2>
          <p className="text-black text-base font-medium max-w-[1100px] ">
            View all the cars and their current status
          </p>
        </div>
        <div>
          <Separator className="mt-10 mb-20 w-2/3" />
        </div>
      </div>

      <Table className="w-full">
        <TableHeader>
          <TableRow className="">
            <TableHead className="px-4 text-sm text-text_light_gray">
              Sl No
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Image
            </TableHead>

            <TableHead className="px-4 text-sm text-text_light_gray">
              Brand
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Model
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Category
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Transmission
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Car Owner
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Details
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Seats
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray">
              Status
            </TableHead>
            <TableHead className="text-sm text-text_light_gray px-20">
              Actions
            </TableHead>
            <TableHead className="px-4 text-sm text-text_light_gray"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {acceptedCars.map((car: any, index: any) => (
            <TableRow key={car.id}>
              <TableCell className="px-4 text-[15px] text-text_dark_gray font-semibold">
                {index + 1}.
              </TableCell>
              <TableCell className="px-4">
                <Image
                  src={car.mainImage || "/default-image.png"}
                  alt={car.title}
                  width={500}
                  height={500}
                  className="h-14 w-20 rounded object-cover"
                />
              </TableCell>
              <TableCell className="px-4  text-[15px] text-text_dark_gray">
                {car.brand}
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray">
                {car.model}
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray">
                {car.category}
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray">
                {car.transmission}
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray">
                {car.owner?.firstName} {car.owner?.lastName}
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray font-medium underline hover:text-red hover:cursor-pointer">
                <Link href={`/dashboard/accepted-vehicles/${car.id}`}>
                  View Details
                </Link>
              </TableCell>
              <TableCell className="px-4 text-[15px] text-text_dark_gray">
                {car.seats}
              </TableCell>
              <TableCell
                className={
                  car.acceptanceStatus === "ACCEPTED"
                    ? "px-4 text-green font-medium text-sm"
                    : "px-4 text-text_dark_gray font-medium text-sm"
                }
              >
                {car.acceptanceStatus}
              </TableCell>
              <TableCell className="text-[15px] space-x-2 my-5 flex items-center w-96 relative">
                {car.carStatus === "ACTIVE" ? (
                  <button
                    onClick={() => handleUpdateCarStatus(car.id, car.carStatus)}
                    className="bg-gray-200 text-text_dark_gray px-6 py-2 rounded-md flex gap-2 items-center w-32 text-sm font-medium"
                  >
                    <Image
                      src={suspend}
                      alt="suspend"
                      width={20}
                      height={20}
                      className="h-3 w-3"
                    />
                    Suspend
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpdateCarStatus(car.id, car.carStatus)}
                    className="bg-gray-200 text-text_dark_gray px-4 py-1.5 rounded-md flex gap-2 items-center w-32 text-sm font-semibold"
                  >
                    <Image
                      src={active}
                      alt="active"
                      width={100}
                      height={100}
                      className="h-7 w-7 rounded-full"
                    />
                    ACTIVE
                  </button>
                )}

                <button
                  onClick={() => handleDelete(car.id)}
                  className="bg-red/90 text-white px-6 py-2 rounded-md flex gap-2 items-center w-32 text-sm font-medium"
                >
                  <LiaTrashSolid className="w-5 h-5" />
                  Delete
                </button>
                <div className="relative">
                  <button
                    ref={dropdownButtonRef}
                    className="text-black hover:text-red w-28 px-4 py-2.5 rounded-md flex gap-2 items-center"
                    onClick={() => handleClick(car.id)}
                  >
                    <HiOutlineDotsVertical className="w-5 h-5" />
                  </button>
                </div>
                {openDropdownId === car.id &&
                  ReactDOM.createPortal(
                    <div
                      ref={dropdownRef}
                      className="absolute z-50 mt-2 top-[440px] right-[210px] w-72 bg-white border border-gray-300 rounded-xl shadow-md"
                    >
                      <ul>
                        <button
                          onClick={() => handleAddToOffer(car.id, car.carType)}
                          className={`flex items-center gap-3 text-black mx-auto text-sm font-normal hover:font-medium hover:text-red hover:bg-red/5 px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                            car.carType === "BEST_OFFER"
                              ? "text-red cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <MdOutlineLocalOffer size={18} />
                          {car.carType === "BEST_OFFER"
                            ? "Remove from Best Offer Section"
                            : "Add to Best Offer Section"}
                        </button>

                        <button
                          onClick={() =>
                            handleAddToPopuler(car.id, car.carType)
                          }
                          className={`flex items-center gap-3 text-black mx-auto text-sm font-normal hover:font-medium hover:text-red hover:bg-red/5 px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                            car.carType === "POPULAR"
                              ? "text-red cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <GiPartyPopper size={18} />
                          {car.carType === "POPULAR"
                            ? "Remove from Popular Section"
                            : "Add to Popular Section"}
                        </button>
                      </ul>
                    </div>,
                    document.body
                  )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-6">
        <Pagination
          totalPages={totalPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AcceptedCars;
