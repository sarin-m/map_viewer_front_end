import { Marker, Popup,useMapEvents} from 'react-leaflet';
import {Icon} from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function LocationMarker({selectedPosition, setSelectedPosition}) {
  const DefaultIcon = new Icon({
    iconUrl: markerIcon,
    // iconSize: [18,20],
    // shadowUrl: markerShadow,
  });
  useMapEvents({
    click(event) {
      setSelectedPosition(event.latlng);
    },
  });
    
  return selectedPosition ? (
    <Marker position={selectedPosition} icon={DefaultIcon} >
      <Popup>You clicked here: {selectedPosition.lat}, {selectedPosition.lng}</Popup>
    </Marker>
  ) : null;
}