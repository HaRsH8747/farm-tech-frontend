import React, { useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const markersData = [
  // Your markers data
];

function MapComponent({ setSelectedMarker, markers }) {
  const mapRef = useRef(null);

  const onLoad = map => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapRef.current && markers.length) {
      const bounds = new window.google.maps.LatLngBounds();
      markers.forEach(marker => {
        bounds.extend({ lat: marker.latitude, lng: marker.longitude });
      });
      mapRef.current.fitBounds(bounds);
    }
  }, [markers]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCX48Yb5B8VJJPyNI67kmGs_nuP3WUaK9I">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        onLoad={onLoad}
        // Remove the center and zoom props as they'll be dynamically calculated
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;