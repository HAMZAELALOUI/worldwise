import { BrowserRouter, Route, Routes } from "react-router-dom"
import Products from "./pages/Product"
import Pricing from "./pages/Pricing"
import HomePage from "./pages/HomePage"
import PageNotFound from "./pages/PageNotFound"
import AppLayouts from "./pages/AppLayouts"
import Login from "./pages/Login"

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index  element={<HomePage/>}/>
    <Route path="products" element={<Products/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="app" element={<AppLayouts/>}>    
        <Route index  element={<p>Cities List</p>} />
        <Route path="cities"  element={<p>Cities</p>} />
        <Route path="countries"  element={<p>Countries</p>} />
        <Route path="form"  element={<p>Form</p>} />
    </Route>
    <Route path="login" element={<Login/>}/>
    <Route path="*" element={<PageNotFound/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
