// Map.tsx
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface MapProps {
  gps: string;
}

export default function Map({ gps }: MapProps) {
  const [latitude, longitude] = gps.split(",").map(Number);
  const position: [number, number] = [latitude, longitude];

  return (
    <MapContainer className="map-content" center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} />
    </MapContainer>
  );
}
