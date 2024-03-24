// DetailsComponent.js
import React from 'react';
import styled from 'styled-components';

function DetailsComponent({ marker }) {
    return (
        <>
            <Wrapper>
                <div className="card">
                    <h2>{marker.name}</h2>
                    <p><strong>City:</strong> {marker.city}</p>
                    <p><strong>Province:</strong> {marker.province}</p>
                    <p><strong>Storage Capacity:</strong> {marker.storageCapacity}</p>
                    <p><strong>Storage Type:</strong> {marker.storageType}</p>
                    <p><strong>Minimum Renting Period:</strong> {marker.minRentingPeriod}</p>
                </div>
            </Wrapper>
        </>

    );
}

const Wrapper = styled.section`
/* DetailsComponent.css */
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-top: 0;
}

.card p {
  margin-bottom: 10px;
  line-height: 1.6;
}
`;


export default DetailsComponent;