/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRef, useEffect, useState } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Geocoder } from "@mapbox/search-js-react";

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface MapComponentProps {
  onResult: (
    result: string,
    longitude: number,
    latitude: number,
    map: mapboxgl.Map
  ) => void;
  initialLocation?: string; // New: Pass stored location from Redux
  initialCoords?: { longitude: number; latitude: number }; // New: Pass stored coords
}

const MapComponent = ({
  onResult,
  initialLocation,
  initialCoords,
}: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

  // Initialize the map with stored location (if available)
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: initialCoords
        ? [initialCoords.longitude, initialCoords.latitude]
        : [-74.5, 40], // Use stored coords or default
      zoom: initialCoords ? 12 : 9, // Zoom closer if location exists
      accessToken: accessToken,
    });

    mapInstanceRef.current = map;

    // Add a marker if initial location exists
    if (initialCoords) {
      const newMarker = new mapboxgl.Marker()
        .setLngLat([initialCoords.longitude, initialCoords.latitude])
        .addTo(map);
      setMarker(newMarker);
    }

    return () => map.remove();
  }, [initialCoords]); // Re-run if initialCoords changes


  // Update marker when a new location is selected
  const handleGeocoderResult = (event: any) => {
    const result = `${event?.properties?.name_preferred} ${event?.properties?.place_formatted}`;
    const longitude = parseFloat(event?.properties?.coordinates?.longitude);
    const latitude = parseFloat(event?.properties?.coordinates?.latitude);

    // Remove old marker (if exists)
    if (marker) marker.remove();

    // Add new marker
    const newMarker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(mapInstanceRef.current!);
    setMarker(newMarker);

    // Fly to the new location
    mapInstanceRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 12,
    });

    // Update Redux state
    onResult(result, longitude, latitude, mapInstanceRef.current!);
  };

  return (
    <div>
      <div>
        <Geocoder
          accessToken={accessToken}
          map={mapInstanceRef.current as mapboxgl.Map}
          mapboxgl={mapboxgl}
          onRetrieve={handleGeocoderResult}
          marker={false}
          {...({ value: initialLocation } as any)} // Type assertion
        />
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default MapComponent;
