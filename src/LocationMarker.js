import { Marker, Popup,useMapEvents} from 'react-leaflet';
import { useState } from 'react';
export default function LocationMarker() {
    const [selectedPosition, setSelectedPosition] = useState(null);
        useMapEvents({
          click(event) {
            // Update the selected position state with the clicked coordinates
            setSelectedPosition(event.latlng);
            // getLocation(event.latlng);
          },
        });
    
        return selectedPosition ? (
          <Marker position={selectedPosition}>
            <Popup>You clicked here: {selectedPosition.lat}, {selectedPosition.lng}</Popup>
          </Marker>
        ) : null;
}