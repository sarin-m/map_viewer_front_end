import 'leaflet/dist/leaflet.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MapComponent from './MapComponent';
import ImageGallery from './ImageGallery';
import './Header.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1 style={{ textAlign: 'center' }}>Capture the Map Data</h1> */}

        <nav className="nav">
            <Link to="/" className="nav-link">Map</Link>
            <Link to="/images" className="nav-link" style={{ marginLeft: '15px' }}>Image Gallery</Link>
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
