import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import LocationMarker from './LocationMarker';
import CaptureButton from './CaptureButton';
import html2canvas from 'html2canvas';
import leafletImage from 'leaflet-image';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import  './App.css';



function MapComponent () {

  const mapRef = useRef();
  const userId = useRef();
  const [Marker, setMarker] = useState(0);

  let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const position = [20.5937, 78.9629];

  const captureMap = async () => {
    console.log('point1.....')
    const map = mapRef.current
    console.log('point2....')
    const inputValue = userId.current.value;
    if (mapRef.current) {
      console.log('point3.....')
      // try {
      //   const canvas = await html2canvas(mapRef.current);
      //   const imageData = canvas.toDataURL('image/png');
      //   sendImageToBackend(imageData);
      // } catch (error) {
      //   console.error('Error capturing map:', error);
      // }
      
      leafletImage(map, (err, canvas) => {
        console.log('point4.....')
        if (err) {
          console.error('Error capturing the map:', err);
          return;
        }
        console.log('point5.....')
        // Convert the canvas to a data URL (base64 image)
        const imageData = canvas.toDataURL();
  
        // You can also convert it to a Blob for uploading as a file
        // canvas.toBlob((blob) => {
        //   uploadImage(blob);
        // });
  
        // Send the base64 image data to the backend API
        uploadImage(imageData, inputValue);
      });
    }

  };

  const updateMarker = (value) => {
    console.log('ipdated marker....',)
    setMarker(value);
  }

  const uploadImage = (imageData, inputValue) => {
    axios.post('http://127.0.0.1:3021/upload-map', { image: imageData, userId: inputValue })
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const sendImageToBackend = (imageData) => {
    // Replace with your actual API endpoint
    fetch('http://127.0.0.1:3021/upload-map', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  };
  return (
    <div className='map-parent-container'>
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
                {/* <LocationMarker getLocation = { () => {updateMarker()}}/> */}
                {/* <LocationMarker getLocation={(position) => updateMarker(position)} /> */}
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
