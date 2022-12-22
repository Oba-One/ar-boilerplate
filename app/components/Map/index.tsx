import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface MarkerProps {
  position: [number, number];
  title: string;
  draggable?: boolean;
}

interface Props {
  markers?: MarkerProps[];
  onMarkerPositionChange?: (position: [number, number], index: number) => void;
  onOverlayChange?: (overlay: string) => void;
  defaultOverlay?: string;
  defaultZoom?: number;
}

const Map: React.FC<Props> = (props) => {
  return (
    <MapContainer center={[51.505, -0.09]}  zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}></Marker>
    </MapContainer>
  );
};

export default Map;
