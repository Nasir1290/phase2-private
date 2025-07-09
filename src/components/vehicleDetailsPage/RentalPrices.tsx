/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SectionHeader3 } from "../shared/sectionHeader/SectionHeader";
import { Car } from "@/types/cars";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./RentalTable";

const RentalPrices = ({ car }: { car: Car }) => {
  return (
    <div>
      <SectionHeader3 title="Prezzi di noleggio" />
      <Table>
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead className="w-[20px]">TEMPO</TableHead>
            <TableHead className="w-[20px]">PREZZO</TableHead>
            <TableHead className="w-[20px]">KM INCLUSI</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Iterate over car price data */}
          {car?.price
            .filter(
              (info: any) =>
                info.price !== 0 &&
                info.kilometerPerHour !== "" &&
                info.rentalTime > 0
            )
            .map((info: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium border-b">
                  {info.rentalTime} {info.rentalTime === 1 ? "ora" : "ore"}
                </TableCell>
                <TableCell className="font-medium border-b">
                  {info.price} .-
                </TableCell>
                <TableCell className="font-medium border-b">
                  {info.kilometerPerHour === "Unlimited"
                    ? "illimitati"
                    : `${info.kilometerPerHour} km`}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RentalPrices;
