import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationMarker from './LocationMarker';
import leafletImage from 'leaflet-image';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import  './App.css';
import ImageD from './ImageD.js'



function MapComponent () {

  const mapRef = useRef();
  const userId = useRef();
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);

  let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const position = [20.5937, 78.9629];

  const captureMap = async () => {
    const map = mapRef.current
    const inputValue = userId.current.value;
    if (mapRef.current) {
      leafletImage(map, (err, canvas) => {
        if (err) {
          console.error('Error capturing the map:', err);
          return;
        }
        const imageData = canvas.toDataURL();
        setCapturedImageUrl(imageData);
        uploadImage(imageData, inputValue);
      });
    }

  };

  const uploadImage = (imageData, inputValue) => {
    axios.post('http://127.0.0.1:3021/upload-map', { image: imageData, userId: inputValue })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  return (
    <div className='map-parent-container'>
      {capturedImageUrl && <ImageD imageUrl={capturedImageUrl} />  }

        <MapContainer
            ref={mapRef}
            center={position} // Centering the map over India
            zoom={4.9}
            scrollWheelZoom={true}
            style={{ height: '400px', width: '80%' }}
            >
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker/>
        </MapContainer>
        <div style={{display:'flex', gap:'10px'}}>
          <p>User Id: </p>
          <input type='text' ref={userId}  placeholder="Please give the user Id"/>
        </div>
          <button onClick={captureMap} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Capture Map Data
        </button>
    </div>
  );
};

export default MapComponent;
