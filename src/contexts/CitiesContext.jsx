import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()
const BASE_CITIES='http://localhost:3000'

function CitiesProvider({children}){

const [cities ,setCities]=useState([]);
const [isLoading,setIsLoading]=useState(false)
const [currentCity,setCurrentCity]=useState({})

useEffect(function(){
  async function fetchCities(){
    try{
    setIsLoading(true)
     const res =await fetch(`${BASE_CITIES}/cities`)
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


async function getCity(id){
  try{
    setIsLoading(true)
     const res =await fetch(`${BASE_CITIES}/cities/${id}`)
     const data = await res.json()
     setCurrentCity(data)
     }catch{
      alert('ther is an error frtching data...')
    }finally{
      setIsLoading(false)
    }
}

return (
  <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity
  }}>
   {children}
  </CitiesContext.Provider>
)

}
function useCities(){
  const context =useContext(CitiesContext)
  if(context === undefined) throw new Error("CitiesContext is used outside  of the CitiesProvider ")
  return context
}
export {useCities , CitiesProvider}