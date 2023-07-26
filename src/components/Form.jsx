// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";

const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [geoIsLoading,setGeoIsLoading]=useState(false)
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji ,setEmoji]=useState("");
  const [geoCodingError ,setGeoCodingError]=useState("")
  const [lat,lng]=useUrlPosition()



  useEffect(function(){
    async function fetchCityData(){
      try{
     
      setGeoIsLoading(true)
      setGeoCodingError("")
      const res =await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
      const data = await res.json()
      console.log(data)
      if(!data.countryCode) throw new Error("That doesn't seem to be a city . click somewhere else ")
       setCityName(data.city || data.locality || "")
       setCountry(data.countryName)
       setEmoji(convertToEmoji(data.countryCode))
       }catch(err){
        alert('ther is an error frtching data...')
        setGeoCodingError(err.message)
      }finally{
        setGeoIsLoading(false)
      }
    }
    fetchCityData()
  },[lat,lng])
   
    if(geoCodingError) return <Message message={geoCodingError}/>

  return (
    <>
    {geoIsLoading ? <Spinner/> : <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      
      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton/>
        
      </div>
    </form>}
    </>

  );
}

export default Form;
