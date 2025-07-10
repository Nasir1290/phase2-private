/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import mapLogo from "@/assets/vehicle/map.svg";
import { Modal } from "antd";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useState } from "react";
import Mapbox from "./Mapbox/Mapbox";

const MapModal = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsMapModalOpen(true)} aria-label="Open map" role="button">
        <Image src={mapLogo} alt="map" width={20} height={20} className="h-4 w-4" />
        <p className="text-text_dark_gray text-sm cursor-pointer">Mappa</p>
      </div>

      <Modal
        title={null}
        open={isMapModalOpen}
        onCancel={() => setIsMapModalOpen(false)}
        footer={null}
        width={800}
        // height="95vh"
        className="vehicle-filter-modal"
        closeIcon={"x"}
        styles={{
          body: { padding: 0 },
        }}
        aria-labelledby="map-modal-title"
      >
        <div className="relative w-full h-full">
          <Mapbox />
        </div>
      </Modal>
    </div>
  );
};

export default MapModal;
