import styles from "./CountryItem.module.css";
// import styles from "./CityItem.module.css";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",

//   }).format(new Date(date));

function CountryItem({ country }) {
  // console.log(country)
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{country.emoji}</span>
      <span className={styles.name}>{country.country}</span>

    </li>
  )
}

export default CountryItem;
