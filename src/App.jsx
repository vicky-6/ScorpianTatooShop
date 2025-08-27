import { Routes, Route } from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/Navbar/NewNavbar";
import Footer from "./components/Footer/Footer";
import ContactUsButton from "./components/ContactUsButton/ContactUsButton";
import HomePageMain from "./Pages/Home/HomePageMain";
import AppointmentPageMain from "./Pages/Appointment/AppointmentPageMain";
import AcademyPageMain from "./Pages/Academy/AcademyPageMain";
import Categories from "./Pages/Category/Category";

function App() {
  return (
    <>
      <CustomNavbar />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<HomePageMain />} />
          <Route path="/appointment" element={<AppointmentPageMain />} />
          <Route path="/category" element={<Categories />} />
          <Route path="/academy" element={<AcademyPageMain />} />
        </Routes>
      </div>
      <Footer />
      <ContactUsButton />
    </>
  );
}

export default App;
