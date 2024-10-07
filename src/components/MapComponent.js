import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './LocationMarker';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import '../styles/App.css';
import ImageD from './ImageD.js';
import html2canvas from 'html2canvas';

function MapComponent() {
  const mapContainerRef = useRef(); // Ref for the container wrapping the map
  const userIdRef = useRef();
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  const position = [10.8505, 76.2711];

  console.log('selectedPosition.....', selectedPosition);

  const captureMap = async () => {
    const inputValue = userIdRef.current.value;

    if (mapContainerRef.current) {
      try {
        // Use html2canvas to capture the map container
        const canvas = await html2canvas(mapContainerRef.current, {
          useCORS: true, // Enable cross-origin images
          allowTaint: true, // Allow tainted canvas
          logging: true, // Enable logging for debugging
          backgroundColor: null, // Set background to transparent if needed
        });

        const imageData = canvas.toDataURL('image/png');
        setCapturedImageUrl(imageData);

        // Upload the captured image
        uploadImage(imageData, inputValue);
      } catch (err) {
        console.error('Error capturing the map with html2canvas:', err);
      }
    }
  };

  const uploadImage = (imageData, inputValue) => {
    axios
      .post('http://127.0.0.1:3021/upload-map', {
        image: imageData,
        userId: inputValue,
        selectedPosition: selectedPosition,
      })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  return (
    <div className="map-parent-container">
      {capturedImageUrl && <ImageD imageUrl={capturedImageUrl} />}

      {/* Wrap the MapContainer with a div that has the ref */}
      <div ref={mapContainerRef} style={{ height: '400px', width: '100%',  display: 'flex', justifyContent: 'center' }}>
        <MapContainer
          center={position} // Centering the map over India
          zoom={4.9}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '80%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker
            selectedPosition={selectedPosition}
            setSelectedPosition={setSelectedPosition}
          />
        </MapContainer>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <p>User Id:</p>
        <input
          type="text"
          ref={userIdRef}
          placeholder="Please enter the user Id"
        />
      </div>
      <button
        onClick={captureMap}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Capture Map Data
      </button>
    </div>
  );
}

export default MapComponent;
