import { useState, useEffect } from 'react'
import './Preloader.css'

function Preloader({ onFinish }) {
    const [phase, setPhase] = useState('enter') /* enter → visible → exit */

    useEffect(() => {
        /* Logo visible after short delay */
        const t1 = setTimeout(() => setPhase('visible'), 200)
        /* Start exit at 2.5s */
        const t2 = setTimeout(() => setPhase('exit'), 2500)
        /* Fully done at 3s */
        const t3 = setTimeout(() => onFinish(), 3200)
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }, [onFinish])

    return (
        <div className={`preloader preloader--${phase}`}>
            {/* Background layers */}
            <div className="preloader__bg">
                <div className="preloader__glow preloader__glow--1" />
                <div className="preloader__glow preloader__glow--2" />
                <div className="preloader__grain" />
            </div>

            {/* Content */}
            <div className="preloader__content">
                {/* Logo */}
                <div className="preloader__logo-wrap">
                    <img
                        src="https://i.imgur.com/rMyDKuZ.jpg"
                        alt="Curcio Negocios Inmobiliarios"
                        className="preloader__logo"
                    />
                </div>

                {/* Line accent */}
                <div className="preloader__line" />

                {/* Tagline */}
                <p className="preloader__tagline">Negocios Inmobiliarios</p>
            </div>
        </div>
    )
}

export default Preloader