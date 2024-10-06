import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ImageGallery.css'; 
import Skeleton from './SkeletonImage';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);  // State to handle the selected image for modal
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

  // Function to handle image click and open the modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <div className="image-grid">
        {images.length > 0 ? (
          images.map((image) => (
            <div key={image._id} className="image-card" onClick={() => handleImageClick(image)}>
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
          <div style={{"display":"grid", "gridAutoFlow": "column"}}>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
          </div>
        )}
      </div>


      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage.imageBase64} alt="Enlarged Map" className="modal-image" />
            <div className="modal-details">
              <h4>Uploaded At: {new Date(selectedImage.uploadedAt).toLocaleString()}</h4>
              <p>Latitude: {selectedImage.latitude}</p>
              <p>Longitude: {selectedImage.longitude}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
