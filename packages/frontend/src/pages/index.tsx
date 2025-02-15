import Home from "./home";
import Login from "./login";
import "../styling/index.sass";
import { Route, Routes } from "react-router-dom";

export default function Index() {

  return (
    <Routes> 
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  )
}
