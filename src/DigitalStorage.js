import React, { useState, useRef, useEffect } from 'react';
import DropdownMenu from './components/SearchComponent';
import MapComponent from './components/MapComponent';
import DetailsComponent from './components/DetailsComponent';
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
  const [selectedMarker, setSelectedMarker] = React.useState(null);
  const [filters, setFilters] = useState({});
  const [filteredMarkers, setFilteredMarkers] = useState(markersData);

  
  useEffect(() => {
    const applyFilters = () => {
      const filtered = markersData.filter(marker => {
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
    <>
      <Wrapper>
        <div className="digital-storage">
          <div className="section section1">
            <DropdownMenu
              data={markersData}
              fields={['city', 'storageType', 'storageCapacity']}
              fieldNames={[
                { field: 'city', name: 'Select a City' },
                { field: 'storageCapacity', name: 'Storage Capacity' },
                { field: 'storageType', name: 'Storage Type' }
              ]}
              onFiltersChange={handleFiltersChange}
            />
          </div>
          <div className="section section2">
            <MapComponent setSelectedMarker={setSelectedMarker} markers={filteredMarkers} />
          </div>
          <div className="section section3">
            {selectedMarker && <DetailsComponent marker={selectedMarker} />}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
/* DigitalStorage.css */
.digital-storage {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  gap: 1rem;
  height: calc(100vh - var(--header-footer-height)); /* Adjust the var(--header-footer-height) as needed */
}

.section {
  border: 1px solid #ddd;
  padding: 1rem;
}

.section1 {
  grid-row: 1 / span 2;
}

.section2, .section3 {
  height: 50%;
}
  
`;

export default DigitalStorage;