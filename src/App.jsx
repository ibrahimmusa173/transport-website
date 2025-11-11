import "./index.css";
 import { Routes, Route } from "react-router-dom";

import Test from "./Pages/test/test";


function App() {

  return (
    <>
     



    <Routes>

      <Route path="/" element={<Test/>}/>             

    </Routes>
    </>
  )
}

export default App
