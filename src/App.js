import 'leaflet/dist/leaflet.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MapComponent from './MapComponent';
import ImageGallery from './ImageGallery';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Capture the Map Data</h1>
        
        <nav style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Link to="/">Map</Link>
          <Link to="/images" style={{ marginLeft: '15px' }}>Image Gallery</Link>
        </nav>

        <Routes>
          <Route path="/images/:userId" element={<ImageGallery />} />
          <Route path="/" element={<MapComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
