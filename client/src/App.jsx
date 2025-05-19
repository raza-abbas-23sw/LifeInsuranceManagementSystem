import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <Navbar/>
      <main className="pt-20 xl:pt-13">
        <AppRoutes />
      </main>
      <Footer/>
    </>
  );
}

export default App;
