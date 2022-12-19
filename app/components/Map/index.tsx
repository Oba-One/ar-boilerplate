import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface Marker {
  position: [number, number];
  title: string;
  draggable?: boolean;
}

interface Props {
  markers?: Marker[];
  onMarkerPositionChange?: (position: [number, number], index: number) => void;
  onOverlayChange?: (overlay: string) => void;
  defaultOverlay?: string;
  defaultZoom?: number;
}

const MyMap: React.FC<Props> = (props) => {
  const [overlay, setOverlay] = useState(props.defaultOverlay || "streets");
  const [zoom, setZoom] = useState(props.defaultZoom || 13);
  const [markers, setMarkers] = useState(props.markers || []);

  const handleMarkerDrag = (e: any, index: number) => {
    const newMarkers = [...markers];
    newMarkers[index].position = e.latlng;
    setMarkers(newMarkers);
    if (props.onMarkerPositionChange) {
      props.onMarkerPositionChange(e.latlng, index);
    }
  };

  const handleOverlayChange = (e: any) => {
    setOverlay(e.target.value);
    if (props.onOverlayChange) {
      props.onOverlayChange(e.target.value);
    }
  };

  return (
    <MapContainer
      center={markers.length > 0 ? markers[0].position : [51.505, -0.09]}
      zoom={zoom}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.org/${overlay}/{z}/{x}/{y}.png`}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          title={marker.title}
          draggable={marker.draggable}
          eventHandlers={{
            dragend: (e) => handleMarkerDrag(e, index),
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MyMap;
