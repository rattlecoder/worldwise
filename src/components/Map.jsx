import React, { useEffect, useState } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, Popup, TileLayer, Marker, useMap, useMapEvent } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import {useGeolocation} from '../hooks/useGeolocation.js'
import Button from './Button';


export default function Map() {

  const {cities} = useCities();

  const [mapPosition,setMapPosition] = useState([40,0]);

  const [searchParams,setSearchParams] = useSearchParams();

  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

  // getting current lat and lng from URL ( cities/73930385?lat=38.727881642324164&lng=-9.140900099907554 )
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(function(){
    if(mapLat && mapLng) setMapPosition([mapLat,mapLng]);
  },[mapLat,mapLng]);

  useEffect(function(){
    if(geolocationPosition) setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
  },[geolocationPosition])

  return (
    <div className={styles.mapContainer}  >
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use you position"}
      </Button>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        )    )}
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  )

  /*return (
    <div className={styles.mapContainer} onClick={() => {navigate("form")}} >
      <h1>Map</h1>
      <h1>
        Position : {lat} : {lng}
      </h1>
      <button onClick={() => { setSearchParams({ lat:23, lng:50 }) }}>Change</button>
    </div>
  )*/
}

function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){

  // used to straight away navigate to mentioned page, like "form" in this case
  const navigate = useNavigate();

  // e represents the cordinates o point where you clicked
  useMapEvent({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  });
}