import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import './Navbar.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const navLinks = [
        { to: '/', label: 'Inicio' },
        { to: '/propiedades', label: 'Propiedades' },
        { to: '/sobre-nosotros', label: 'Sobre nosotros' },
        { to: '/tasaciones', label: 'Tasaciones' },
        { to: '/contacto', label: 'Contacto' },
    ]

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">

                {/* Logo — imagen real */}
                <Link to="/" className="navbar__logo" aria-label="Ir al inicio">
                    <img
                        src="https://imgur.com/MO5cE2O.jpg"
                        alt="Curcio Negocios Inmobiliarios"
                        className="navbar__logo-img"
                    />
                </Link>

                {/* Links desktop */}
                <ul className="navbar__links">
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                            >
                                <span className="navbar__link-text">{link.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA WhatsApp desktop */}
                <a
                    href="https://wa.me/5493425668050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__cta"
                >
                    <Phone size={15} />
                    <span>Contactanos</span>
                </a>

                {/* Hamburguesa mobile — animated */}
                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                >
                    <div className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}>
                        <span />
                        <span />
                        <span />
                    </div>
                </button>
            </div>

            {/* Overlay mobile */}
            <div
                className={`navbar__overlay ${menuOpen ? 'navbar__overlay--open' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Menú mobile */}
            <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
                <div className="navbar__mobile-logo">
                    <img src="/logo-curcio.png" alt="Curcio" className="navbar__mobile-logo-img" />
                </div>

                <ul className="navbar__mobile-links">
                    {navLinks.map((link, i) => (
                        <li key={link.to} style={{ animationDelay: `${i * 0.06}s` }}>
                            <Link
                                to={link.to}
                                className={`navbar__mobile-link ${location.pathname === link.to ? 'navbar__mobile-link--active' : ''}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <a
                    href="https://wa.me/5493425668050"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__mobile-cta"
                >
                    <Phone size={18} />
                    <span>Contactanos por WhatsApp</span>
                </a>
            </div>
        </nav>
    )
}

export default Navbar