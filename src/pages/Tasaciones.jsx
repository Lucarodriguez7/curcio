import { Link } from 'react-router-dom'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import './ComingSoon.css'

function Tasaciones() {
    return (
        <div className="coming-soon">
            <div className="coming-soon__bg" />
            <div className="coming-soon__content">
                <div className="coming-soon__icon">
                    <TrendingUp size={32} strokeWidth={1.5} />
                </div>
                <span className="coming-soon__tag">En desarrollo</span>
                <h1 className="coming-soon__title">Tasaciones</h1>
                <p className="coming-soon__text">
                    Próximamente vas a poder solicitar una tasación profesional
                    directamente desde nuestro sitio. Mientras tanto, consultanos por WhatsApp.
                </p>
                <div className="coming-soon__actions">
                    <Link to="/" className="coming-soon__btn">
                        <ArrowLeft size={16} /> Volver al inicio
                    </Link>
                    <a
                        href="https://wa.me/5493425668050?text=Hola%2C%20quisiera%20consultar%20por%20una%20tasaci%C3%B3n"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="coming-soon__btn coming-soon__btn--wa"
                    >
                        Consultar tasación
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Tasaciones