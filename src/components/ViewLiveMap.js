// src/components/MapView.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import {Icon} from 'leaflet';
import '../styles/MapView.css'; // Optional: custom styles

export default function ViewLiveMap () {
    const DefaultIcon = new Icon({
    iconUrl: markerIcon,
    // iconSize: [18,20],
    // shadowUrl: markerShadow,
    });
  const [mapDatas, setMapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { userId } = useParams();

  // Fetch map data from the backend
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3021/images/${userId}`);
        setMapData(response.data.images);
      } catch (err) {
        console.error('Error fetching map data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMapData();
  }, []); // Empty dependency array since userId is static
  

  if (loading) {
    return <div className="loader">Loading map data...</div>;
  }

  if (error) {
    return <div className="error">Failed to load map data.</div>;
  }

  // Determine the initial map center
  const initialPosition = [10.8505, 76.2711];

  return (
    <div style={{ height: '400px', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <MapContainer center={initialPosition} zoom={4.8}
        style={{ height: '100%', width: '80%' }}
        className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapDatas.map((item, index) => (
          <Marker key={index} icon={DefaultIcon} position={[item.latitude, item.longitude]}>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

//  ViewLiveMap;
