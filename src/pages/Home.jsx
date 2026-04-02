import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
    Building2, Home as HomeIcon, Briefcase, Store,
    ChevronLeft, ChevronRight, ArrowRight, Phone,
    Heart, MessageCircle, Send, Bookmark,
    Users, Award, Handshake, TrendingUp,
    MapPin, ArrowUpRight, BedDouble, Bath, Maximize
} from 'lucide-react'
import './Home.css'
import './Instagram.css'

/* ========================================
   HOOK: Count-up animation on scroll
   ======================================== */
function useCountUp(target, duration = 2000) {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const started = useRef(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    const startTime = performance.now()
                    const animate = (now) => {
                        const elapsed = now - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        /* easeOutQuart */
                        const eased = 1 - Math.pow(1 - progress, 4)
                        setCount(Math.floor(eased * target))
                        if (progress < 1) requestAnimationFrame(animate)
                    }
                    requestAnimationFrame(animate)
                }
            },
            { threshold: 0.3 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [target, duration])

    return { count, ref }
}

/* ========================================
   HOOK: Reveal on scroll (IntersectionObserver)
   ======================================== */
function useReveal(threshold = 0.15) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [threshold])

    return { ref, visible }
}

/* ========================================
   DATA
   ======================================== */
const stats = [
    { value: 25, suffix: '+', label: 'Años de trayectoria' },
    { value: 1200, suffix: '+', label: 'Propiedades vendidas' },
    { value: 350, suffix: '+', label: 'Clientes satisfechos' },
    { value: 98, suffix: '%', label: 'Tasa de satisfacción' },
]

const categories = [
    { title: 'Departamentos', slug: 'departamentos', desc: 'Monoambientes, 1, 2 y 3 dormitorios', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop', count: '45+' },
    { title: 'Casas', slug: 'casas', desc: 'Residencias familiares y quintas', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=800&fit=crop', count: '30+' },
    { title: 'Oficinas', slug: 'oficinas', desc: 'Espacios comerciales y profesionales', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop', count: '15+' },
    { title: 'Locales', slug: 'locales', desc: 'Locales a la calle y en galerías', image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&h=800&fit=crop', count: '20+' },
]

const featuredProperties = [
    {
        id: 1,
        title: 'Departamento en Bv. Gálvez',
        type: 'Departamento',
        operation: 'Venta',
        price: 'USD 95.000',
        location: 'Bv. Gálvez 1200, Santa Fe',
        beds: 2, baths: 1, area: 72,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop',
    },
    {
        id: 2,
        title: 'Casa en Guadalupe',
        type: 'Casa',
        operation: 'Venta',
        price: 'USD 180.000',
        location: 'Guadalupe, Santa Fe',
        beds: 3, baths: 2, area: 210,
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    },
    {
        id: 3,
        title: 'Oficina en el Centro',
        type: 'Oficina',
        operation: 'Alquiler',
        price: '$450.000/mes',
        location: 'San Martín 2500, Santa Fe',
        beds: 0, baths: 1, area: 55,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    },
    {
        id: 4,
        title: 'Dpto 3 ambientes Recoleta',
        type: 'Departamento',
        operation: 'Venta',
        price: 'USD 125.000',
        location: 'Zona Recoleta, Santa Fe',
        beds: 2, baths: 1, area: 85,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    },
    {
        id: 5,
        title: 'Local sobre Av. Freyre',
        type: 'Local',
        operation: 'Alquiler',
        price: '$380.000/mes',
        location: 'Av. Freyre 3100, Santa Fe',
        beds: 0, baths: 1, area: 90,
        image: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&h=400&fit=crop',
    },
]

const services = [
    { icon: Handshake, title: 'Compra & Venta', desc: 'Asesoramiento integral en cada operación inmobiliaria, desde la tasación hasta la escrituración.' },
    { icon: TrendingUp, title: 'Tasaciones', desc: 'Valuaciones profesionales respaldadas por más de 25 años de experiencia en el mercado santafesino.' },
    { icon: Users, title: 'Alquileres', desc: 'Gestión completa de alquileres, garantías y administración de propiedades para propietarios e inquilinos.' },
    { icon: Award, title: 'Asesoramiento', desc: 'Consultoría personalizada para inversiones inmobiliarias, desarrollos y proyectos.' },
]

const instaPosts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop', likes: 47, comments: 8 },
    { id: 2, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop', likes: 62, comments: 12 },
    { id: 3, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop', likes: 35, comments: 5 },
    { id: 4, image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=400&fit=crop', likes: 51, comments: 9 },
]

/* ========================================
   STAT ITEM COMPONENT
   ======================================== */
function StatItem({ value, suffix, label }) {
    const { count, ref } = useCountUp(value, 2200)
    return (
        <div className="hero-stat" ref={ref}>
            <span className="hero-stat__number">{count.toLocaleString('es-AR')}{suffix}</span>
            <span className="hero-stat__label">{label}</span>
        </div>
    )
}

/* ========================================
   FEATURED SLIDER COMPONENT
   ======================================== */
function FeaturedSlider() {
    const trackRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardWidth, setCardWidth] = useState(0)
    const gap = 24

    useEffect(() => {
        const updateWidth = () => {
            if (!trackRef.current) return
            const container = trackRef.current.parentElement
            const containerW = container.offsetWidth
            const isMobile = window.innerWidth <= 576
            const isTablet = window.innerWidth <= 900
            const visible = isMobile ? 1.15 : isTablet ? 2.1 : 3
            const w = (containerW - gap * (Math.floor(visible) - 1)) / visible
            setCardWidth(w)
        }
        updateWidth()
        window.addEventListener('resize', updateWidth)
        return () => window.removeEventListener('resize', updateWidth)
    }, [])

    const maxIndex = Math.max(0, featuredProperties.length - (window.innerWidth <= 576 ? 1 : window.innerWidth <= 900 ? 2 : 3))

    const slide = (dir) => {
        setCurrentIndex(prev => Math.max(0, Math.min(prev + dir, maxIndex)))
    }

    /* Touch swipe for mobile */
    const touchStart = useRef(0)
    const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
    const handleTouchEnd = (e) => {
        const diff = touchStart.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1)
    }

    return (
        <div className="featured-slider">
            <div className="featured-slider__controls">
                <button onClick={() => slide(-1)} disabled={currentIndex === 0} className="featured-slider__arrow" aria-label="Anterior">
                    <ChevronLeft size={20} />
                </button>
                <button onClick={() => slide(1)} disabled={currentIndex >= maxIndex} className="featured-slider__arrow" aria-label="Siguiente">
                    <ChevronRight size={20} />
                </button>
            </div>
            <div className="featured-slider__viewport">
                <div
                    ref={trackRef}
                    className="featured-slider__track"
                    style={{ transform: `translateX(-${currentIndex * (cardWidth + gap)}px)` }}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {featuredProperties.map(prop => (
                        <div key={prop.id} className="prop-card" style={{ minWidth: cardWidth, maxWidth: cardWidth }}>
                            <div className="prop-card__image-wrap">
                                <img src={prop.image} alt={prop.title} loading="lazy" />
                                <span className="prop-card__badge">{prop.operation}</span>
                            </div>
                            <div className="prop-card__body">
                                <span className="prop-card__price">{prop.price}</span>
                                <h4 className="prop-card__title">{prop.title}</h4>
                                <p className="prop-card__location"><MapPin size={14} /> {prop.location}</p>
                                <div className="prop-card__features">
                                    {prop.beds > 0 && <span><BedDouble size={14} /> {prop.beds}</span>}
                                    <span><Bath size={14} /> {prop.baths}</span>
                                    <span><Maximize size={14} /> {prop.area}m²</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

/* ========================================
   INSTA POST COMPONENT
   ======================================== */
function InstaPost({ post }) {
    const [liked, setLiked] = useState(false)
    return (
        <div className="insta-post">
            <img src={post.image} alt="Post de Instagram" loading="lazy" />
            <div className="insta-post__overlay">
                <div className="insta-post__actions">
                    <button onClick={() => setLiked(!liked)} className={`insta-post__btn ${liked ? 'insta-post__btn--liked' : ''}`}>
                        <Heart size={20} fill={liked ? '#e74c3c' : 'none'} /> {post.likes + (liked ? 1 : 0)}
                    </button>
                    <span className="insta-post__btn"><MessageCircle size={20} /> {post.comments}</span>
                </div>
            </div>
        </div>
    )
}

/* ========================================
   HOME PAGE
   ======================================== */
function Home() {
    const categoriesRef = useRef(null)
    const revealServices = useReveal()
    const revealInsta = useReveal()
    const revealBanner = useReveal(0.2)

    /* Mobile swipe for categories */
    const catTouchStart = useRef(0)
    const handleCatTouchStart = (e) => { catTouchStart.current = e.touches[0].clientX }
    const handleCatTouchEnd = (e) => {
        if (!categoriesRef.current) return
        const diff = catTouchStart.current - e.changedTouches[0].clientX
        categoriesRef.current.scrollBy({ left: diff > 0 ? 260 : -260, behavior: 'smooth' })
    }

    return (
        <div className="home">

            {/* ============================
          HERO
          ============================ */}
            <section className="hero">
                <div className="hero__bg">
                    <div className="hero__overlay" />
                    <div className="hero__grain" />
                    <div className="hero__glow hero__glow--1" />
                    <div className="hero__glow hero__glow--2" />
                </div>

                <div className="hero__inner">
                    <div className="hero__content">
                        <div className="hero__badge">Más de 25 años en el mercado inmobiliario</div>
                        <h1 className="hero__title">
                            Tu próximo hogar<br />
                            <span className="hero__title-accent">te está esperando</span>
                        </h1>
                        <p className="hero__subtitle">
                            En Curcio Negocios Inmobiliarios encontrás asesoramiento profesional,
                            propiedades seleccionadas y el respaldo de una empresa con trayectoria en Santa Fe.
                        </p>
                        <div className="hero__ctas">
                            <Link to="/propiedades" className="btn btn--primary">
                                Ver propiedades <ArrowRight size={18} />
                            </Link>
                            <a href="https://wa.me/5493425668050" target="_blank" rel="noopener noreferrer" className="btn btn--glass">
                                <Phone size={18} /> Hablá con nosotros
                            </a>
                        </div>
                    </div>

                    <div className="hero__stats">
                        {stats.map((s, i) => (
                            <StatItem key={i} {...s} />
                        ))}
                    </div>
                </div>

                <div className="hero__scroll-hint">
                    <div className="hero__scroll-line" />
                </div>
            </section>

            {/* ============================
          CATEGORÍAS
          ============================ */}
            <section className="section categories">
                <div className="section__container">
                    <div className="section__header">
                        <span className="section__tag">Explorá</span>
                        <h2 className="section__title">Encontrá tu espacio ideal</h2>
                        <p className="section__desc">Seleccioná el tipo de propiedad que buscás y descubrí nuestra cartera disponible.</p>
                    </div>
                    <div
                        className="categories__grid"
                        ref={categoriesRef}
                        onTouchStart={handleCatTouchStart}
                        onTouchEnd={handleCatTouchEnd}
                    >
                        {categories.map((cat, i) => (
                            <Link
                                to={`/propiedades?tipo=${cat.slug}`}
                                key={cat.slug}
                                className="cat-card"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <div className="cat-card__img-wrap">
                                    <img src={cat.image} alt={cat.title} loading="lazy" className="cat-card__img" />
                                    <div className="cat-card__overlay" />
                                </div>
                                <div className="cat-card__content">
                                    <span className="cat-card__count">{cat.count} propiedades</span>
                                    <h3 className="cat-card__title">{cat.title}</h3>
                                    <p className="cat-card__desc">{cat.desc}</p>
                                    <span className="cat-card__link">Ver catálogo <ArrowRight size={16} /></span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================
          PROPIEDADES DESTACADAS
          ============================ */}
            <section className="section featured">
                <div className="section__container">
                    <div className="section__header">
                        <span className="section__tag">Selección</span>
                        <h2 className="section__title">Propiedades destacadas</h2>
                        <p className="section__desc">Nuestras propiedades más buscadas del momento, elegidas por el equipo.</p>
                    </div>
                    <FeaturedSlider />
                    <div className="featured__ver-mas">
                        <Link to="/propiedades" className="btn btn--outline">
                            Ver todas las propiedades <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ============================
          LO QUE HACEMOS
          ============================ */}
            <section
                className={`section services ${revealServices.visible ? 'section--visible' : ''}`}
                ref={revealServices.ref}
            >
                <div className="section__container">
                    <div className="services__layout">
                        <div className="services__text">
                            <span className="section__tag">Nuestra esencia</span>
                            <h2 className="section__title">Lo que hacemos</h2>
                            <p className="services__intro">
                                Somos un equipo de profesionales apasionados por el mercado inmobiliario santafesino.
                                Desde 1999 acompañamos a familias y empresas en cada decisión, con transparencia,
                                compromiso y un conocimiento profundo de la zona.
                            </p>
                            <a href="https://wa.me/5493425668050" target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: '0.5rem' }}>
                                <Phone size={18} /> Contactanos
                            </a>
                        </div>
                        <div className="services__cards">
                            {services.map((srv, i) => (
                                <div className="srv-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                                    <div className="srv-card__icon">
                                        <srv.icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h4 className="srv-card__title">{srv.title}</h4>
                                        <p className="srv-card__desc">{srv.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================
          INSTAGRAM
          ============================ */}
            <section className="section-insta-premium">
                <div className="insta-luxury-container">

                    {/* TEXTO EDITORIAL */}
                    <div className="insta-content-premium">
                        <span className="insta-tagline-luxury">Comunidad Curcio</span>
                        <h2 className="insta-title-luxury">
                            Tu próximo hogar, <br />
                            antes que nadie en <span>Instagram</span>
                        </h2>
                        <p className="insta-description-luxury">
                            Inspiración diaria y propiedades exclusivas. Unite a los más de <strong>5,100 seguidores</strong> que ya confían en nuestra visión.
                        </p>

                        <a href="https://instagram.com/curcio.propiedades" target="_blank" className="btn-insta-metallic">
                            <span className="metallic-glint"></span>
                            <span className="btn-text">@curcio.propiedades</span>
                            <ArrowUpRight size={18} className="metallic-icon" />
                        </a>
                    </div>

                    {/* COMPOSICIÓN VISUAL: MOCKUP GRANDE + BACKGROUND BOKEH */}
                    <div className="insta-visual-luxury">

                        {/* Tus imágenes de Imgur como fondo artístico */}
                        <div className="insta-backdrop-art">
                            <img src="https://imgur.com/P7DyceU.jpg" className="bokeh-img img-1" alt="" />
                            <img src="https://imgur.com/rqVmf6Z.jpg" className="bokeh-img img-2" alt="" />
                            <img src="https://imgur.com/tXRJsqC.jpg" className="bokeh-img img-3" alt="" />
                            <img src="https://imgur.com/qM7isYd.jpg" className="bokeh-img img-4" alt="" />
                        </div>

                        {/* Mockup XL */}
                        <div className="mockup-xl-wrapper">
                            <img
                                src="https://imgur.com/KxodWwo.jpg" // Asegúrate que esta ruta sea correcta
                                alt="Curcio Premium App"
                                className="mockup-xl-img"
                            />
                        </div>
                    </div>

                </div>
            </section>
            {/* ============================
          BANNER TASACIÓN
          ============================ */}
            <section
                className={`tasacion ${revealBanner.visible ? 'tasacion--visible' : ''}`}
                ref={revealBanner.ref}
            >
                <div className="tasacion__bg">
                    <div className="tasacion__glow" />
                </div>
                <div className="tasacion__content">
                    <h2 className="tasacion__title">¿Querés saber cuánto vale tu propiedad?</h2>
                    <p className="tasacion__text">
                        Nuestro equipo realiza tasaciones profesionales con más de 25 años de experiencia
                        en el mercado santafesino. Consultá sin compromiso.
                    </p>
                    <a href="https://wa.me/5493425668050?text=Hola%2C%20quisiera%20consultar%20por%20una%20tasaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="btn btn--silver">
                        Consultar tasación <ArrowRight size={18} />
                    </a>
                </div>
            </section>

        </div>
    )
}

export default Home