import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft, MapPin, BedDouble, Bath, Maximize, Car,
    Calendar, ChevronLeft, ChevronRight, X, Phone, Send,
    Heart, Share2, Star, Check, ArrowRight, Expand
} from 'lucide-react'
import { ALL_PROPERTIES, formatPrice } from '../data/propertiesData'
import './Propertydetail.css'

/* ═══════════════════════════════════════════════════════════════
   GALLERY WITH MODAL
   ═══════════════════════════════════════════════════════════════ */
function Gallery({ images, title }) {
    const [current, setCurrent] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalIndex, setModalIndex] = useState(0)

    const openModal = (i) => { setModalIndex(i); setModalOpen(true) }
    const closeModal = () => setModalOpen(false)
    const modalPrev = () => setModalIndex(i => (i - 1 + images.length) % images.length)
    const modalNext = () => setModalIndex(i => (i + 1) % images.length)

    /* Keyboard nav in modal */
    useEffect(() => {
        if (!modalOpen) return
        const handler = (e) => {
            if (e.key === 'Escape') closeModal()
            if (e.key === 'ArrowLeft') modalPrev()
            if (e.key === 'ArrowRight') modalNext()
        }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handler)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handler)
        }
    }, [modalOpen])

    if (!images || images.length === 0) return null

    /* Max thumbnails to show (last one becomes "Ver todas" if more) */
    const maxThumbs = 5
    const showVerTodas = images.length > maxThumbs
    const visibleThumbs = showVerTodas ? images.slice(0, maxThumbs) : images

    return (
        <>
            <div className="gallery">
                {/* Main image */}
                <div className="gallery__main" onClick={() => openModal(current)}>
                    <img src={images[current]} alt={`${title} - foto ${current + 1}`} />
                    {/* Photo count badge */}
                    <div className="gallery__count">
                        <Expand size={14} /> {images.length} fotos
                    </div>
                </div>

                {/* Thumbnails row */}
                {images.length > 1 && (
                    <div className="gallery__thumbs">
                        {visibleThumbs.map((img, i) => (
                            <div
                                key={i}
                                className={`gallery__thumb ${i === current ? 'gallery__thumb--active' : ''}`}
                                onClick={() => setCurrent(i)}
                            >
                                <img src={img} alt={`${title} - miniatura ${i + 1}`} />
                            </div>
                        ))}
                        {/* "Ver todas" button */}
                        {showVerTodas && (
                            <div className="gallery__thumb gallery__thumb-all" onClick={() => openModal(0)}>
                                <Expand size={18} />
                                <span>Ver todas</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* MODAL */}
            {modalOpen && (
                <div className="gallery-modal" onClick={closeModal}>
                    <div className="gallery-modal__inner" onClick={e => e.stopPropagation()}>
                        <button className="gallery-modal__close" onClick={closeModal}><X size={22} /></button>

                        <button className="gallery-modal__arrow gallery-modal__arrow--left" onClick={modalPrev}>
                            <ChevronLeft size={28} />
                        </button>

                        <div className="gallery-modal__img-wrap">
                            <img src={images[modalIndex]} alt={`${title} - foto ${modalIndex + 1}`} />
                        </div>

                        <button className="gallery-modal__arrow gallery-modal__arrow--right" onClick={modalNext}>
                            <ChevronRight size={28} />
                        </button>

                        <div className="gallery-modal__counter">
                            {modalIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT SIDEBAR CARD
   ═══════════════════════════════════════════════════════════════ */
function ContactCard({ property }) {
    const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
    const [sent, setSent] = useState(false)

    const waMsg = encodeURIComponent(
        `Hola, estoy interesado/a en la propiedad: ${property.title} (${formatPrice(property.price, property.currency)}) - ${property.address}. ¿Podrían darme más información?`
    )

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 4000)
        setForm({ nombre: '', email: '', telefono: '', mensaje: '' })
    }

    return (
        <div className="contact-card">
            {/* Price header */}
            <div className="contact-card__price-section">
                <span className="contact-card__operation">{property.operation}</span>
                <span className="contact-card__price">{formatPrice(property.price, property.currency)}</span>
                {property.currency === 'USD' && property.sqm && (
                    <span className="contact-card__price-sqm">USD {Math.round(property.price / property.sqm).toLocaleString('es-AR')}/m²</span>
                )}
            </div>

            {/* WhatsApp CTA */}
            <a
                href={`https://wa.me/5493425668050?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card__wa"
            >
                <Phone size={18} />
                Consultar por WhatsApp
            </a>

            {/* Divider */}
            <div className="contact-card__divider">
                <span>o enviá tu consulta</span>
            </div>

            {/* Form */}
            <form className="contact-card__form" onSubmit={handleSubmit}>
                <input
                    type="text" placeholder="Tu nombre"
                    value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                    required
                />
                <input
                    type="email" placeholder="Tu email"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="tel" placeholder="Tu teléfono"
                    value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })}
                />
                <textarea
                    placeholder="¿Qué te gustaría saber sobre esta propiedad?"
                    rows={3}
                    value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })}
                />
                <button type="submit" className="contact-card__submit" disabled={sent}>
                    {sent ? (
                        <><Check size={16} /> Consulta enviada</>
                    ) : (
                        <><Send size={16} /> Enviar consulta</>
                    )}
                </button>
            </form>

            {/* Agent info */}
            <div className="contact-card__agent">
                <div className="contact-card__agent-avatar">C</div>
                <div>
                    <p className="contact-card__agent-name">Curcio Negocios Inmobiliarios</p>
                    <p className="contact-card__agent-sub">Asesoramiento profesional</p>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   SIMILAR PROPERTIES
   ═══════════════════════════════════════════════════════════════ */
function SimilarProperties({ current }) {
    const similar = ALL_PROPERTIES
        .filter(p => p.id !== current.id && p.type === current.type)
        .slice(0, 3)

    if (similar.length === 0) return null

    return (
        <section className="similar">
            <h2 className="similar__title">Propiedades similares</h2>
            <div className="similar__grid">
                {similar.map(p => (
                    <Link to={`/propiedades/${p.id}`} key={p.id} className="similar-card">
                        <div className="similar-card__img-wrap">
                            <img src={p.img} alt={p.title} loading="lazy" />
                            <span className="similar-card__badge">{p.operation}</span>
                        </div>
                        <div className="similar-card__body">
                            <span className="similar-card__price">{formatPrice(p.price, p.currency)}</span>
                            <h4 className="similar-card__name">{p.title}</h4>
                            <p className="similar-card__address"><MapPin size={11} /> {p.address}</p>
                            <div className="similar-card__features">
                                {p.beds !== null && <span><BedDouble size={12} /> {p.beds}</span>}
                                <span><Bath size={12} /> {p.baths}</span>
                                <span><Maximize size={12} /> {p.sqm}m²</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN: PROPERTY DETAIL PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function PropertyDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const property = ALL_PROPERTIES.find(p => p.id === Number(id))

    if (!property) {
        return (
            <div className="detail-not-found">
                <h2>Propiedad no encontrada</h2>
                <p>La propiedad que buscás no existe o fue removida.</p>
                <button onClick={() => navigate('/propiedades')} className="btn btn--outline">
                    <ArrowLeft size={16} /> Volver al catálogo
                </button>
            </div>
        )
    }

    const images = property.imgs || [property.img]

    const features = [
        property.beds !== null && { icon: BedDouble, label: 'Dormitorios', value: property.beds },
        { icon: Bath, label: 'Baños', value: property.baths },
        { icon: Maximize, label: 'Superficie', value: `${property.sqm} m²` },
        property.garages > 0 && { icon: Car, label: 'Cocheras', value: property.garages },
        { icon: Calendar, label: 'Antigüedad', value: property.age === 0 ? 'A estrenar' : `${property.age} años` },
    ].filter(Boolean)

    return (
        <div className="detail-page">

            {/* ── BACK BUTTON ── */}
            <div className="detail-page__top">
                <button onClick={() => navigate('/propiedades')} className="detail-back">
                    <ArrowLeft size={16} />
                    <span>Volver al catálogo</span>
                </button>
                <div className="detail-top-actions">
                    <button className="detail-top-btn"><Heart size={16} /> Guardar</button>
                    <button className="detail-top-btn"><Share2 size={16} /> Compartir</button>
                </div>
            </div>

            {/* ── GALLERY ── */}
            <Gallery images={images} title={property.title} />

            {/* ── CONTENT + SIDEBAR ── */}
            <div className="detail-layout">

                {/* Left: main content */}
                <div className="detail-main">

                    {/* Header */}
                    <div className="detail-header">
                        <div className="detail-header__badges">
                            <span className={`detail-badge detail-badge--${property.operation === 'Venta' ? 'venta' : 'alquiler'}`}>
                                {property.operation}
                            </span>
                            <span className="detail-badge detail-badge--type">{property.type}</span>
                            {property.featured && (
                                <span className="detail-badge detail-badge--featured"><Star size={10} fill="var(--plata)" stroke="none" /> Destacada</span>
                            )}
                            {property.new && <span className="detail-badge detail-badge--new">Nuevo</span>}
                            {property.reduced && <span className="detail-badge detail-badge--reduced">Precio reducido</span>}
                        </div>
                        <h1 className="detail-header__title">{property.title}</h1>
                        <p className="detail-header__address"><MapPin size={15} /> {property.address}</p>
                        <p className="detail-header__price-mobile">{formatPrice(property.price, property.currency)}</p>
                    </div>

                    {/* Características */}
                    <section className="detail-section">
                        <h2 className="detail-section__title">Características</h2>
                        <div className="detail-features">
                            {features.map((f, i) => (
                                <div key={i} className="detail-feature">
                                    <div className="detail-feature__icon">
                                        <f.icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <span className="detail-feature__value">{f.value}</span>
                                        <span className="detail-feature__label">{f.label}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Amenities */}
                    {property.amenities && property.amenities.length > 0 && (
                        <section className="detail-section">
                            <h2 className="detail-section__title">Comodidades</h2>
                            <div className="detail-amenities">
                                {property.amenities.map((a, i) => (
                                    <span key={i} className="detail-amenity">
                                        <Check size={14} /> {a}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Descripción */}
                    <section className="detail-section">
                        <h2 className="detail-section__title">Descripción</h2>
                        <p className="detail-desc">{property.desc}</p>
                    </section>

                    {/* Mapa */}
                    <section className="detail-section">
                        <h2 className="detail-section__title">Ubicación</h2>
                        <div className="detail-map">
                            <iframe
                                title="Ubicación de la propiedad"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                        <p className="detail-map__address"><MapPin size={13} /> {property.address}</p>
                    </section>

                    {/* Mobile contact card */}
                    <div className="detail-contact-mobile">
                        <ContactCard property={property} />
                    </div>

                    {/* Similares */}
                    <SimilarProperties current={property} />
                </div>

                {/* Right: sidebar */}
                <aside className="detail-sidebar">
                    <ContactCard property={property} />
                </aside>
            </div>
        </div>
    )
}