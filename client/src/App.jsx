import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ParticleBG from "./components/ParticleBG";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/check-auth", {
          withCredentials: true,
        });
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, []);

  if (!authChecked) return <div>Loading...</div>; // Optional


  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="pt-20 xl:pt-13">
        <ParticleBG />
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </main>
      <Footer />
    </>
  );
}

export default App;
