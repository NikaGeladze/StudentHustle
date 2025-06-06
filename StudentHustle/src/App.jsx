import { useState } from "react";
import {Routes,Route} from 'react-router-dom'
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Courses from "./components/Courses.jsx";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses/>} />
      </Routes>
    </>
  );
}

export default App;
