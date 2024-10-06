import 'leaflet/dist/leaflet.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MapComponent from './MapComponent';
import ImageGallery from './ImageGallery';
import ViewLiveMap from './ViewLiveMap';
import './Header.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1 style={{ textAlign: 'center' }}>Capture the Map Data</h1> */}

        <nav className="nav">
            <Link to="/" className="nav-link">Map</Link>
            <Link to="/images" className="nav-link" style={{ marginLeft: '15px' }}>Image Gallery</Link>
            <Link to="/livemaps" className="nav-link" style={{ marginLeft: '15px' }}>Map Live View</Link>
        </nav>


        <Routes>
          <Route path="/images/:userId" element={<ImageGallery />} />
          <Route path="/" element={<MapComponent />} />
          <Route path="/livemaps/:userId" element={<ViewLiveMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
