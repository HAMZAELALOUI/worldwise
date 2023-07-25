import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext()
const BASE_CITIES='http://localhost:3000/cities'

function CitiesProvider({children}){

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

return (
  <CitiesContext.Provider value={{
    cities,
    isLoading
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