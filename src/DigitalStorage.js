import React, { useState, useRef, useEffect } from "react";
import DropdownMenu from "./components/SearchComponent";
import MapComponent from "./components/MapComponent";
import DetailsComponent from "./components/DetailsComponent";

import styled from "styled-components";

const DigitalStorage = () => {
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
      minRentingPeriod: "6 months",
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
      minRentingPeriod: "3 months",
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
      minRentingPeriod: "1 month",
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
      minRentingPeriod: "12 months",
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
      minRentingPeriod: "1 month",
    },
  ];
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [filters, setFilters] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState(markersData);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = markersData.filter((marker) => {
        // For each filter, return true only if the marker matches all selected filter criteria
        return Object.entries(filters).every(([filterKey, filterValues]) => {
          if (!filterValues.length) {
            return true; // No filter selected for this category
          }
          return filterValues.includes(marker[filterKey]);
        });
      });
      setFilteredMarkers(filtered);
    };

    applyFilters();
  }, [filters]);

  const handleFiltersChange = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
  <div className="flex overflow-hidden">
    {/* Sidebar for Filters */}
    <div className="w-1/4 xl:w-1/5 bg-sky-200 p-4 border-r border-gray-200">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zm2 8a1 1 0 100 2h12a1 1 0 100-2H5zm3 7a1 1 0 001 1h4a1 1 0 100-2H9a1 1 0 00-1 1z" />
        </svg>
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>
      <DropdownMenu
        data={markersData}
        fields={["city", "storageType", "storageCapacity"]}
        fieldNames={[
          { field: "city", name: "Select a City" },
          { field: "storageCapacity", name: "Storage Capacity" },
          { field: "storageType", name: "Storage Type" },
        ]}
        onFiltersChange={handleFiltersChange}
      />
    </div>

        {/* Main Content */}
        <div className="w-3/4 xl:w-4/5 p-4">
          {/* Map with added margin-top */}
          <div className="mt-8 mb-4 rounded-lg shadow-xl overflow-hidden border border-gray-500">
            <MapComponent
              setSelectedMarker={setSelectedMarker}
              markers={filteredMarkers}
            />
          </div>

          {/* Details */}
          {selectedMarker && (
            // <div className="mt-4 bg-white p-6 rounded-lg shadow-lg">
              <DetailsComponent marker={selectedMarker} />
            // </d  iv>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalStorage;