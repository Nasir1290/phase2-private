import MyVehiclesHeader from "@/components/myVehicles/MyVehiclesHeader";
import MyVehiclesList from "@/components/myVehicles/MyVehiclesList";
import React from "react";

const MyVehicles = () => {
  return (
    <div className="mt-40 my-20 space-y-16">
      <MyVehiclesHeader />
      <MyVehiclesList />
    </div>
  );
};

export default MyVehicles;
