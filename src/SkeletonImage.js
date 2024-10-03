import './ImageGallery.css'; 
export default function Skeleton() {
    return (
        <div className="image-grid loading">
            <div className="image-card loading">
                <h4>Uploaded At: </h4>
                <div className='card loading'>
                </div>
                <p>Latitude:  </p>
                <p>Longitude: </p>
            </div>
        </div>
    )
}