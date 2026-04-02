import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, ArrowUpRight, ChevronRight } from 'lucide-react'
import './Footer.css'

function Footer() {
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="footer">
            {/* Línea decorativa superior */}
            <div className="footer__line" />

            <div className="footer__inner">

                {/* Columna 1: Logo + descripción */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo" onClick={scrollToTop}>
                        <div className="footer__logo-icon">
                            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <circle cx="20" cy="20" r="18" stroke="var(--plata)" strokeWidth="2" />
                                <path
                                    d="M26 16c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2.2 1.2 4.1 3 5.2V28h2v-3h2v3h2v-6.8c1.8-1.1 3-3 3-5.2z"
                                    fill="var(--plata)"
                                />
                            </svg>
                        </div>
                        <div className="footer__logo-text">
                            <span className="footer__logo-nombre">CURCIO</span>
                            <span className="footer__logo-sub">NEGOCIOS INMOBILIARIOS S.R.L.</span>
                        </div>
                    </Link>
                    <p className="footer__desc">
                        Más de 25 años brindando asesoramiento profesional en el mercado
                        inmobiliario de Santa Fe. Compra, venta, alquiler y tasaciones.
                    </p>
                    <div className="footer__social">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                <circle cx="12" cy="12" r="5" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        {/* WhatsApp */}
                        <a href="https://wa.me/5493425668050" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Columna 2: Navegación */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Navegación</h4>
                    <ul className="footer__links">
                        <li><Link to="/" onClick={scrollToTop}><ChevronRight size={14} /> Inicio</Link></li>
                        <li><Link to="/propiedades"><ChevronRight size={14} /> Propiedades</Link></li>
                        <li><Link to="/contacto"><ChevronRight size={14} /> Contacto</Link></li>
                    </ul>
                </div>

                {/* Columna 3: Servicios */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Servicios</h4>
                    <ul className="footer__links">
                        <li><a href="https://wa.me/5493425668050?text=Hola%2C%20quiero%20consultar%20por%20una%20venta" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Compra & Venta</a></li>
                        <li><a href="https://wa.me/5493425668050?text=Hola%2C%20quiero%20consultar%20por%20alquileres" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Alquileres</a></li>
                        <li><a href="https://wa.me/5493425668050?text=Hola%2C%20quisiera%20consultar%20por%20una%20tasaci%C3%B3n" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Tasaciones</a></li>
                        <li><a href="https://wa.me/5493425668050?text=Hola%2C%20necesito%20asesoramiento%20inmobiliario" target="_blank" rel="noopener noreferrer"><ChevronRight size={14} /> Asesoramiento</a></li>
                    </ul>
                </div>

                {/* Columna 4: Contacto */}
                <div className="footer__col">
                    <h4 className="footer__col-title">Contacto</h4>
                    <ul className="footer__contact">
                        <li>
                            <MapPin size={16} />
                            <span>La Rioja 2941, Santa Fe Capital, Argentina</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <a href="https://wa.me/5493425668050" target="_blank" rel="noopener noreferrer">
                                +54 9 3425 66-8050
                            </a>
                        </li>
                        <li>
                            <Clock size={16} />
                            <span>Lun - Vie: 9:00 - 18:00</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                    <p className="footer__copy">
                        &copy; {currentYear} Curcio Negocios Inmobiliarios S.R.L. Todos los derechos reservados.
                    </p>
                    <button className="footer__back-top" onClick={scrollToTop} aria-label="Volver arriba">
                        Volver arriba <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer