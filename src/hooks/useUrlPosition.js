import { useSearchParams } from 'react-router-dom';


export function useUrlPosition() {
  const [searchParams,setSearchParams] = useSearchParams();

  // getting current lat and lng from URL ( cities/73930385?lat=38.727881642324164&lng=-9.140900099907554 )
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");
  return [mapLat,mapLng];
}
