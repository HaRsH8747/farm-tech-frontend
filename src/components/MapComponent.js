import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = { lat: 42.25842463671085, lng: -83.0721388933654 }; // Adjust as needed
const markersData = [
    {
      lat: 42.25842463671085,
      lng: -83.0721388933654,
      detail: "This storage has a great capacity for grains.",
      name: "Grain Storage Facility",
      city: "Windsor",
      province: "Ontario",
      storageCapacity: "10,000 tons",
      storageType: "Grain",
      minRentingPeriod: "6 months"
    },
    {
      lat: 42.29121029697507,
      lng: -82.9939575928812,
      detail: "Ideal for perishable goods, with excellent temperature control.",
      name: "Perishable Goods Storage",
      city: "Essex",
      province: "Ontario",
      storageCapacity: "5,000 cubic feet",
      storageType: "Refrigerated",
      minRentingPeriod: "3 months"
    },
    {
      lat: 42.314937088967046,
      lng: -83.03636360168505,
      detail: "Secure and spacious, perfect for equipment or vehicle storage.",
      name: "Equipment Storage Yard",
      city: "LaSalle",
      province: "Ontario",
      storageCapacity: "2,500 square meters",
      storageType: "Outdoor",
      minRentingPeriod: "1 month"
    },
    {
      lat: 42.26910445645066,
      lng: -83.13831716275215,
      detail: "Specialized in liquid storage with high-capacity tanks.",
      name: "Liquid Storage Tanks",
      city: "Amherstburg",
      province: "Ontario",
      storageCapacity: "500,000 liters",
      storageType: "Liquid",
      minRentingPeriod: "12 months"
    },
    {
      lat: 42.33725627853263,
      lng: -83.04930027008057,
      detail: "Equipped for bulk storage with easy transport access.",
      name: "Bulk Storage Warehouse",
      city: "Tecumseh",
      province: "Ontario",
      storageCapacity: "20,000 pallets",
      storageType: "Dry",
      minRentingPeriod: "1 month"
    }
  ];
function MapComponent({ setSelectedMarker }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAGI1DE32A8avij6BUrzACmKQz6KA9oJew">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      >
        {markersData.map((marker, index) => (
          <Marker 
            key={index} 
            position={{ lat: marker.lat, lng: marker.lng }} 
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;