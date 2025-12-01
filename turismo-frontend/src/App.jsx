import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import "./components/styles/register.css";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
