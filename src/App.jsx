import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import ScrollToTop from "./Components/behavior/ScrollToTop";
import Landing from "./Components/Home/Landing.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/footer/Footer.jsx";
import { Register } from "./Components/routes/auth/Register/Register.jsx";
import { Login } from "./Components/routes/auth/Login/Login";

function App() {
  const navigate = useNavigate();
  useEffect(() => {}, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ScrollToTop />
      {/* Sidebar */}
      <aside className="w-full md:w-44 bg-gray-200 p-4 md:sticky md:top-0 md:h-screen ">
        <Navbar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Content</h2>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
