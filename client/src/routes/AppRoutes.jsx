import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SeePlans from "../pages/SeePlans";
import GeneratePlan from "../pages/GeneratePlan";
import Search from "../pages/Search";
import Add from "../pages/Add";
import Contact from "../pages/Contact";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate-plan" element={<GeneratePlan />} />
      <Route path="/see-plans" element={<SeePlans />} />
      <Route path="/search" element={<Search />} />
      <Route path="/add" element={<Add />} />
      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}
