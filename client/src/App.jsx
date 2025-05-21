import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ParticleBG from "./components/ParticleBG";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Navbar/>
      <main className="pt-20 xl:pt-13">
        <ParticleBG/>
        <AppRoutes />
      </main>
      <Footer/>
    </>
  );
}

export default App;
