import './App.css'
import BookingForm from './Pages/Appointment/Appointment'
import ContactUsButton from './components/ContactUsButton/ContactUsButton'
import Footer from './components/Footer/Footer'
import CustomNavbar from './components/Navbar/NewNavbar'
import Categories from './Pages/Home/Category'
import HomeHeroSection from './Pages/Home/HomeHeroFade'
import UsersReview from './Pages/Home/UserReview'
import AppointmentHero from './Pages/Appointment/AppointmentHero'

function App() {
  return (
    <>
    <CustomNavbar />
    <HomeHeroSection />
    <UsersReview />
    <Categories />
    <AppointmentHero />
    <BookingForm />
    <Footer />
    <ContactUsButton />
      
    </>
  )
}

export default App
