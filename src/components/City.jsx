import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";
import { Fragment, useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import Spinner from "./Spinner";


const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {

  const navigate = useNavigate();

  // cities/:id ,  use useParams to get this :id
  const {id} = useParams();

  const [searchParams,setSearchParams] = useSearchParams();

  const {getCity,currentCity,isLoading} = useCities();

  useEffect(function(){
    getCity(id);
  },[id]);

  const {cityName, emoji, date, notes} = currentCity;

  // getting current lat and lng from URL ( cities/73930385?lat=38.727881642324164&lng=-9.140900099907554 )
  /*const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");*/

  if(isLoading)  return <Spinner/>

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type='back' onClick={(e) => {
          e.preventDefault(); 
          navigate(-1)
         }}>&larr; Back</Button>
      </div>
    </div>
  );
}

export default City;
