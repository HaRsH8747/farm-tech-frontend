import React, { useState, useRef, useEffect } from 'react';
import SearchComponent from './components/SearchComponent';
import MapComponent from './components/MapComponent';
import DetailsComponent from './components/DetailsComponent';
import styled from "styled-components";

const DigitalStorage = () => {
    const [selectedMarker, setSelectedMarker] = React.useState(null);

    return (
        <>
            <Wrapper>
                <div className="digital-storage">
                    <div className="section section1">
                        <SearchComponent />
                    </div>
                    <div className="section section2">
                        <MapComponent setSelectedMarker={setSelectedMarker} />
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