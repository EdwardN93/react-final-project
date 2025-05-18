import { useEffect } from "react";
import Landing from "./Components/Home/Landing.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/footer/Footer.jsx";
import { Register } from "./Components/routes/auth/Register/Register.jsx";
import { Routes, Route, useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  useEffect(() => {}, [navigate]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
