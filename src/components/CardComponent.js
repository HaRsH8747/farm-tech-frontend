// CardComponent.js
import React from 'react';

const CardComponent = ({ selectedMarker }) => {
  if (!selectedMarker) return null;

  return (
    <div style={cardStyle}>
      <h2>{selectedMarker.name}</h2>
      <p>Latitude: {selectedMarker.lat}</p>
      <p>Longitude: {selectedMarker.lng}</p>
      <p>Storage Size: {selectedMarker.storage_size}</p>
      <p>Storage Type: {selectedMarker.storage_type}</p>
    </div>
  );
};

const cardStyle = {
  padding: '20px',
  margin: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  textAlign: 'left',
};

export default CardComponent;