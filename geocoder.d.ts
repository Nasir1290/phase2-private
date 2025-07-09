/* eslint-disable @typescript-eslint/no-explicit-any */
// types/geocoder.d.ts
declare module "@mapbox/search-js-react" {
  import { ForwardRefExoticComponent, RefAttributes } from "react";
  import * as mapboxgl from "mapbox-gl";

  export interface GeocoderProps {
    accessToken: string;
    map: mapboxgl.Map;
    mapboxgl: typeof mapboxgl;
    onRetrieve: (event: any) => void;
    marker?: boolean;

    // Add the theme property here
    theme?: {
      variables: {
        borderRadius: string;
        colorText: string;
        colorPrimary: string;
        colorBackground: string;
      };
      cssText: string;
    };
  }

  export const Geocoder: ForwardRefExoticComponent<
    GeocoderProps & RefAttributes<unknown>
  >;
}
