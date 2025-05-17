import "./index.css";
 import { Routes, Route } from "react-router-dom";


// import Footer from './Components/Footer/Footer';
// import Navbar from './Components/Navbar/Navbar';


import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import OurFleet from "./Pages/Ourfleet/Ourfleet";

                  //  Services
import CargoTransport from "./Pages/Services/CargoTransport/CargoTransport";
import Construction from "./Pages/Services/Construction/Construction";
import Material from "./Pages/Services/Material/Material";
import WaterTransport from "./Pages/Services/WaterTransport/WaterTransport";

function App() {

  return (
    <>
       {/* <Navbar/>


      <h1 className="text-3xl text-center text-red-700"
      >Welcome to Vite with TailwindCSS and Reacnnjtnkjk1231</h1>


    <Footer/> */}



    <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/Contact" element={<Contact/>}/>
      <Route path="/ourfleet" element={<OurFleet/>}/>


              {/* Services */}
      <Route path="/cargotransport" element={<CargoTransport/>}/>
      <Route path="/Construction" element={<Construction/>}/>
      <Route path="/Material" element={<Material/>}/>
      <Route path="/WaterTransport" element={<WaterTransport/>}/>

    </Routes>
    </>
  )
}

export default App
