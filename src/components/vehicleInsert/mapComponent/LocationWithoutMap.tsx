"use client";

import { useRef, useEffect } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder } from "@mapbox/search-js-react";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface GeocoderComponentProps {
  onResult: (result: string, longitude: number, latitude: number) => void;
}

const LocationWithoutMap = ({ onResult }: GeocoderComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

  // Initialize the map once the container is available
  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.5, 40],
        zoom: 9,
        accessToken: accessToken,
      });

      mapInstanceRef.current = map;

      return () => map.remove();
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleGeocoderResult = (event: any) => {
    const result = `${event?.properties?.name_preferred || ""} ${
      event?.properties?.place_formatted || ""
    }`;
    const longitude = parseFloat(event?.properties?.coordinates?.longitude);
    const latitude = parseFloat(event?.properties?.coordinates?.latitude);
    onResult(result, longitude, latitude);
  };

  // Custom theme for the geocoder
  const customTheme = {
    variables: {
      borderRadius: "8px",
      colorText: "#333",
      colorPrimary: "#0078ff",
      colorBackground: "#ffffff",
    },
    cssText: `
    .Input {
      padding: 20px 40px;  /* Increased padding on the x-axis (left and right) */
      height: 20px;
      font-size: 14px;
    }
    .Results {
      margin-top: 4px;
      max-height: 300px;
      overflow-y: auto;
    }
        @media (min-width: 640px) {
        .Input {
          padding: 14px 24px;
          height: 40px;
          font-size: 15px;
        }
      }
      @media (min-width: 768px) {
        .Input {
          padding: 16px 32px;
          height: 46px;
          font-size: 16px;
        }
      }
  `,
  };

  return (
    <div className="custom-geocoder-wrapper">
      <Geocoder
        accessToken={accessToken}
        map={mapInstanceRef.current as mapboxgl.Map}
        mapboxgl={mapboxgl}
        onRetrieve={handleGeocoderResult}
        theme={customTheme}
      />
    </div>
  );
};

export default LocationWithoutMap;
