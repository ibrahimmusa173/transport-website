import "./index.css";
 import { Routes, Route } from "react-router-dom";


// import Footer from './Components/Footer/Footer';
// import Navbar from './Components/Navbar/Navbar';


import Home from "./Pages/Home/Home";

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


    </Routes>
    </>
  )
}

export default App
