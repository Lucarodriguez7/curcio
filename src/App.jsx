import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Propiedades from './pages/Propiedades'
import PropertyDetail from './pages/Propertydetail'
import SobreNosotros from './pages/SobreNosotros'
import Tasaciones from './pages/Tasaciones'
import Contacto from './pages/Contacto'
import './App.css'

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  const handlePreloaderFinish = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {loading && <Preloader onFinish={handlePreloaderFinish} />}
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/propiedades" element={<Propiedades />} />
          <Route path="/propiedades/:id" element={<PropertyDetail />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          <Route path="/tasaciones" element={<Tasaciones />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App