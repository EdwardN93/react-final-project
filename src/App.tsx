import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./Components/behavior/ScrollToTop";
import Landing from "./Components/Home/Landing";
import SideNav from "./Components/SideNav/SideNav";
import MainNav from "./Components/MainNav/MainNav";
import { Footer } from "./Components/Footer/Footer";
import { Account } from "./Components/Account/Account";
import { ChangeAccountDetails } from "./Components/Account/ChangeAccountDetails/ChangeAccountDetails";
import VehicleDetails from "./Components/VehicleDetails/VehicleDetails";
import { ModifyCar } from "./Components/ModifyCar/ModifyCar";
import { UserMenu } from "./Components/UserMenu/UserMenu";
import { Register } from "./Components/routes/auth/Register/Register";
import { Login } from "./Components/routes/auth/Login/Login";
import { RegisterCar } from "./Components/routes/RegisterCar/RegisterCar";
import { logout } from "./Components/routes/auth/Logout/Logout";

function App() {
  const navigate = useNavigate();
  const location = useLocation(); // for AnimatePresence key
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | string | null>(
    localStorage.getItem("token") ? true : null
  );

  useEffect(() => {
    // Auto logout if token is expired
    logout(setIsLoggedIn, navigate); // This will only log out if expired
  }, [navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <ScrollToTop />

      <aside className="w-full md:w-44 bg-gray-200 p-4 md:sticky md:top-0 md:h-screen ">
        <SideNav />
      </aside>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-6">
          <div className="flex items-center justify-between shadow-md mb-4 p-2 px-4 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Car Logistic App</h2>
            <UserMenu />
          </div>

          <MainNav />
          <AnimatePresence mode="wait">
            <motion.div>
              <Routes key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register-car" element={<RegisterCar />} />
                <Route path="/vehicles/:id" element={<VehicleDetails />} />
                <Route path="/modify-car/:id" element={<ModifyCar />} />
                <Route path="/account" element={<Account />} />
                <Route
                  path="/change-account-details"
                  element={<ChangeAccountDetails />}
                />
              </Routes>
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
