import React, { useEffect, useState } from 'react'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import Form from './components/Form.jsx'
import City from './components/City'
import CityList from './components/CityList'
import CountryList from './components/CountryList'
import { CitiesProvider } from './contexts/CitiesContext'
import { AuthProvider } from "./contexts/FakeAuthContext";

const BASE_URL = 'http://localhost:8000';

export default function App() {


  const [cities,setCities] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  

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
  
  return (
    <AuthProvider>
     <CitiesProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="product" element={<Product/>} />
            <Route path="pricing" element={<Pricing/>} />
            <Route path="app" element={ <ProtectedRoute> <AppLayout/> </ProtectedRoute>} >
               <Route index element={<CityList />} />
               <Route path="cities" element={<CityList/>} />
               <Route path='cities/:id' element={<City/>} />
               <Route path="countries" element={<CountryList/>} />
               <Route path="form" element={<Form/>} />
            </Route>
            <Route path="login" element={<Login/>} />
            <Route path="*" element={<Homepage/>} />
        </Routes>
      </BrowserRouter>
     </CitiesProvider>
    </AuthProvider>
  )
}
