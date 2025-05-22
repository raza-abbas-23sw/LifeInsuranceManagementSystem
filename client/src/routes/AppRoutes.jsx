import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SeePlans from "../pages/SeePlans";
import GeneratePlan from "../pages/GeneratePlan";
import Search from "../pages/Search";
import Add from "../pages/Add";
import Contact from "../pages/Contact";
import FAQs from "../pages/FAQs";
import SigninPage from "../pages/signinPage";
import SignupPage from "../pages/SignupPage";

export default function AppRoutes( {isLoggedIn, setIsLoggedIn}) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SigninPage  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/signup" element={<SignupPage  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />
      <Route path="/generate-plan" element={<GeneratePlan />} />
      <Route path="/see-plans" element={<SeePlans />} />
      <Route path="/search" element={<Search />} />
      <Route path="/add" element={<Add />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/contact" element={<Contact />} />

    </Routes>
  );
}
