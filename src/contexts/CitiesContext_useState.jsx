/*import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

const BASE_URL = 'http://localhost:8000';

function CitiesProvider({children}){

  const [cities,setCities] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [currentCity,setCurrentCity] = useState({});
  

  useEffect(function() {
    async function fetchCities(){
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
        //console.log(data);
      } catch {
        alert("There was an error loading the data...");
      }
      finally{
        setIsLoading(false);
      }
    }

    fetchCities();
  } ,[]);

  async function getCity(id){
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      //console.log(data);
    } catch {
      alert("There was an error loading the data...");
    }
    finally{
      setIsLoading(false);
    }
  }

  async function createCity(newCity){
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`,{
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities(cities => [...cities,data]);
      //console.log(data);
    } catch {
      alert("There was an error creating the data...");
    }
    finally{
      setIsLoading(false);
    }
  }

  async function deleteCity(id){
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`,{
        method: "DELETE",
      });

      setCities(cities => cities.filter(city => city.id !== id));
      //console.log(data);
    } catch {
      alert("There was an error creating the data...");
    }
    finally{
      setIsLoading(false);
    }
  }

  return <CitiesContext.Provider value={{
          cities: cities,
          isLoading: isLoading,
          currentCity: currentCity,
          getCity: getCity,
          createCity: createCity,
          deleteCity: deleteCity
          }}>
            {children}
          </CitiesContext.Provider>
}

function useCities(){
    const context = useContext(CitiesContext);
    if(context===undefined)
        throw new Error('CitiesContext was use outside CitiesProvider')
    return context;
}

export {CitiesProvider,useCities};*/