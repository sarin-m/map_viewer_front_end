import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ImageGallery.css'; 
const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:3021/images/${userId}`);
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    if (userId) {
      fetchImages();
    }
  }, [userId]);

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="image-card">
              <h4>Uploaded At: {new Date(image.uploadedAt).toLocaleString()}</h4>
              <img
                src={image.imageBase64}
                alt="User Map"
                className="image"
              />
              <p>Latitude: {image.latitude}</p>
              <p>Longitude: {image.longitude}</p>
            </div>
          ))
        ) : (
          <p>No images found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
