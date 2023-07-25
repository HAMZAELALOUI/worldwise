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
import {CitiesContext,CitiesProvider} from "./contexts/CitiesContext"

function App() {
  return (
  <CitiesProvider>
   <BrowserRouter>
   <Routes>
    <Route index  element={<HomePage/>}/>
    <Route path="products" element={<Products/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="app" element={<AppLayouts/>}>    
        <Route index  element={<Navigate replace  to={'cities'}/>} />
        <Route path="cities"  element={<CityList />} />      
        <Route path="cities/:id"  element={<City/>} />      
        <Route path="countries"  element={<CountryList/>} />
        <Route path="form"  element={<Form/>} />
    </Route>
    <Route path="login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
   </CitiesProvider>
  )
}

export default App
