// DetailsComponent.js
import React from 'react';
import styled from 'styled-components';

function DetailsComponent({ marker }) {
    return (
        <>
            <Wrapper>
                <div className="card">
                    <h2 className="title">{marker.name}</h2>
                    <p className="info"><strong>City:</strong> {marker.city}</p>
                    <p className="info"><strong>Province:</strong> {marker.province}</p>
                    <p className="info"><strong>Storage Capacity:</strong> {marker.storageCapacity}</p>
                    <p className="info"><strong>Storage Type:</strong> {marker.storageType}</p>
                    <p className="info last"><strong>Minimum Renting Period:</strong> {marker.minRentingPeriod}</p>
                </div>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.section`
/* DetailsComponent.css */
.card {
  border: 1px solid #e2e8f0; /* A light gray border */
  border-radius: 0.5rem; /* 8px border radius for a smoother curve */
  padding: 1.5rem; /* 24px padding */
  margin-top: 1rem; /* 16px top margin */
  background-color: #f8fafc; /* A very light shade of blue as background color */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* A soft shadow to 'lift' the card */
}

.title {
  color: #2c5282; /* Dark blue color for the title for contrast */
  margin-bottom: 0.75rem; /* 12px bottom margin */
}

.info {
  color: #4a5568; /* Dark gray for the text for better readability */
  margin-bottom: 0.75rem; /* Consistent bottom margin for all paragraphs */
  line-height: 1.75; /* A comfortable line-height for reading */
}

.info.last {
  margin-bottom: 0; /* No bottom margin for the last element */
}
`;

export default DetailsComponent;