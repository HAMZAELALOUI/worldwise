import Map from "../components/Map"
import SideBar from "../components/SideBar"
import styles from './AppLayouts.module.css'

function AppLayouts() {
  return (
    <div className={styles.app}>
      <SideBar/>
      <Map/>
    </div>
  )
}

export default AppLayouts
