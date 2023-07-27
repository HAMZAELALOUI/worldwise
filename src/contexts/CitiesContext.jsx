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
      alert('ther is an error fetching cities...')
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
      alert('ther is an error loading city...')
    }finally{
      setIsLoading(false)
    }
}

async function createCity(newCity){
  try{
    setIsLoading(true)
     const res =await fetch(`${BASE_CITIES}/cities`,{
      method : "POST",
      body:JSON.stringify(newCity),
      headers:{
       "Content-Type":"application/json"
      }      
     })
     const data = await res.json()
     setCities((cities)=>[...cities,data])
   
     }catch{
      alert('ther is an error creating city...')
    }finally{
      setIsLoading(false)
    }
}
async function deleteCity(id){
  try{
    setIsLoading(true)
     await fetch(`${BASE_CITIES}/cities/${id}`,{
      method : "DELETE",     
     })
     setCities((cities)=>cities.filter(city=>city.id !== id))
   
     }catch{
      alert('ther is an error creating city...')
    }finally{
      setIsLoading(false)
    }
}

return (
  <CitiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity
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