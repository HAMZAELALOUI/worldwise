import Map from "../components/Map"
import SideBar from "../components/SideBar"
import User from "../components/User"
import styles from './AppLayouts.module.css'

function AppLayouts() {
  return (
    <div className={styles.app}>
      <SideBar/>
      <Map/>
      <User/>
    </div>
  )
}

export default AppLayouts
