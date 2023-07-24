import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Products from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import AppLayouts from "./pages/AppLayouts"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"
import City from "./components/City"
import Form from "./components/Form"

const BASE_CITIES='http://localhost:3000/cities'


function App() {
const [cities ,setCities]=useState([]);
const [isLoading,setIsLoading]=useState(false)



useEffect(function(){
  async function fetchCities(){
    try{
    setIsLoading(true)
     const res =await fetch(`${BASE_CITIES}`)
     const data = await res.json()
     setCities(data)
     }catch{
      alert('ther is an error frtching data...')
    }finally{
      setIsLoading(false)
    }
  }
  fetchCities()
},[])

// console.log(cities)

 
  return (
   <BrowserRouter>
   <Routes>
    <Route index  element={<HomePage/>}/>
    <Route path="products" element={<Products/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="app" element={<AppLayouts/>}>    
        <Route index  element={<Navigate replace to={'cities'}/>} />
        <Route path="cities"  element={<CityList cities={cities} isLoading={isLoading}/>} />      
        <Route path="cities/:id"  element={<City/>} />      
        <Route path="countries"  element={<CountryList cities={cities} isLoading={isLoading}/>} />
        <Route path="form"  element={<Form/>} />
    </Route>
    <Route path="login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
