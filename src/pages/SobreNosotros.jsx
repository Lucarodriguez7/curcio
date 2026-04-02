import { Link } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'
import './ComingSoon.css'

function SobreNosotros() {
    return (
        <div className="coming-soon">
            <div className="coming-soon__bg" />
            <div className="coming-soon__content">
                <div className="coming-soon__icon">
                    <Users size={32} strokeWidth={1.5} />
                </div>
                <span className="coming-soon__tag">En desarrollo</span>
                <h1 className="coming-soon__title">Sobre nosotros</h1>
                <p className="coming-soon__text">
                    Estamos preparando esta sección con toda la historia, valores
                    y el equipo de Curcio Negocios Inmobiliarios. Muy pronto estará disponible.
                </p>
                <Link to="/" className="coming-soon__btn">
                    <ArrowLeft size={16} /> Volver al inicio
                </Link>
            </div>
        </div>
    )
}

export default SobreNosotros