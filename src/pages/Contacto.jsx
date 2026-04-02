import { Link } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import './ComingSoon.css'

function Contacto() {
    return (
        <div className="coming-soon">
            <div className="coming-soon__bg" />
            <div className="coming-soon__content">
                <div className="coming-soon__icon">
                    <Mail size={32} strokeWidth={1.5} />
                </div>
                <span className="coming-soon__tag">En desarrollo</span>
                <h1 className="coming-soon__title">Contacto</h1>
                <p className="coming-soon__text">
                    Estamos armando esta sección con formulario de contacto,
                    mapa y toda la información para comunicarte con nosotros. Mientras tanto, escribinos por WhatsApp.
                </p>
                <div className="coming-soon__actions">
                    <Link to="/" className="coming-soon__btn">
                        <ArrowLeft size={16} /> Volver al inicio
                    </Link>
                    <a
                        href="https://wa.me/5493425668050"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coming-soon__btn coming-soon__btn--wa"
                    >
                        Escribinos por WhatsApp
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Contacto