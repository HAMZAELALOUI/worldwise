import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Message from './Message'
import Spinner from './Spinner'


function CountryList({cities,isLaoding}) {
  if(isLaoding) return <Spinner/>
  if(!cities.length) return (<Message message='Add A city by clicking ob the map '/>);

  const countries=cities.reduce((arr,city)=>{
    if(!arr.map(el=>el.country).includes(city.country))
       return [...arr ,{country:city.country ,emoji:city.emoji}];
    else return arr;
  },[])

  
  return (
    <ul className={styles.countryList}>
      {countries.map((country)=>(
    <CountryItem 
      country={country} 
      key={country.id}
      />))}
    </ul>
  )
}

export default CountryList
