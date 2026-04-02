import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
    Search, SlidersHorizontal, X, MapPin, Star, ArrowRight,
    BedDouble, Bath, Maximize, ChevronDown, Grid3X3, List,
    Heart, Share2, Filter, ArrowUpDown,
    Home, Building2, Store, Briefcase, CheckCircle2
} from 'lucide-react'
import { ALL_PROPERTIES, formatPrice } from '../data/propertiesData'
import './Propiedades.css'

const TYPES = ['Casa', 'Departamento', 'Local', 'Oficina']
const OPERATIONS = ['Venta', 'Alquiler']
const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-asc', label: 'Menor precio' },
    { value: 'price-desc', label: 'Mayor precio' },
    { value: 'sqm-desc', label: 'Mayor superficie' },
    { value: 'newest', label: 'Más nuevas' },
]

const TYPE_ICONS = { Casa: Home, Departamento: Building2, Local: Store, Oficina: Briefcase }

/* ─── BADGE ─────────────────────────────────────────────────── */
function Badge({ children, variant = 'default' }) {
    return (
        <span className={`prop-badge prop-badge--${variant}`}>
            {children}
        </span>
    )
}

/* ─── PROPERTY CARD — GRID ──────────────────────────────────── */
function PropertyCardGrid({ prop, onFavorite, isFavorite }) {
    const navigate = useNavigate()
    const [imgHover, setImgHover] = useState(false)

    return (
        <div className="pcard" onClick={() => navigate(`/propiedades/${prop.id}`)}>
            {/* Image */}
            <div
                className="pcard__img-wrap"
                onMouseEnter={() => setImgHover(true)}
                onMouseLeave={() => setImgHover(false)}
            >
                <img
                    src={prop.img}
                    alt={prop.title}
                    loading="lazy"
                    className="pcard__img"
                    style={{ transform: imgHover ? 'scale(1.07)' : 'scale(1)' }}
                />
                <div className="pcard__img-gradient" />

                {/* Badges */}
                <div className="pcard__badges">
                    <Badge variant={prop.operation === 'Venta' ? 'venta' : 'alquiler'}>{prop.operation}</Badge>
                    {prop.new && <Badge variant="nuevo">Nuevo</Badge>}
                    {prop.reduced && <Badge variant="reducido">Precio reducido</Badge>}
                </div>

                {/* Actions */}
                <div className="pcard__actions" onClick={e => e.stopPropagation()}>
                    <button
                        onClick={() => onFavorite(prop.id)}
                        className={`pcard__action-btn ${isFavorite ? 'pcard__action-btn--liked' : ''}`}
                    >
                        <Heart size={13} fill={isFavorite ? '#dc2626' : 'none'} stroke={isFavorite ? '#dc2626' : 'currentColor'} />
                    </button>
                    <button className="pcard__action-btn">
                        <Share2 size={13} />
                    </button>
                </div>

                {/* Featured */}
                {prop.featured && (
                    <div className="pcard__featured">
                        <Star size={10} fill="var(--plata)" stroke="none" /> Destacada
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="pcard__body">
                <span className="pcard__type">{prop.type}</span>
                <h3 className="pcard__title">{prop.title}</h3>
                <p className="pcard__address"><MapPin size={12} /> {prop.address}</p>

                <div className="pcard__stats">
                    {prop.beds !== null && (
                        <div className="pcard__stat">
                            <BedDouble size={14} />
                            <strong>{prop.beds}</strong>
                            <span>dorm.</span>
                        </div>
                    )}
                    <div className="pcard__stat">
                        <Bath size={14} />
                        <strong>{prop.baths}</strong>
                        <span>baños</span>
                    </div>
                    <div className="pcard__stat">
                        <Maximize size={14} />
                        <strong>{prop.sqm}</strong>
                        <span>m²</span>
                    </div>
                </div>

                <div className="pcard__footer">
                    <div className="pcard__price-block">
                        <span className="pcard__price">{formatPrice(prop.price, prop.currency)}</span>
                        {prop.currency === 'USD' && prop.sqm && (
                            <span className="pcard__price-sqm">USD {Math.round(prop.price / prop.sqm).toLocaleString('es-AR')}/m²</span>
                        )}
                    </div>
                    <span className="pcard__ver-mas">Ver más <ArrowRight size={12} /></span>
                </div>
            </div>
        </div>
    )
}

/* ─── PROPERTY CARD — LIST ──────────────────────────────────── */
function PropertyCardList({ prop, onFavorite, isFavorite }) {
    const navigate = useNavigate()
    return (
        <div className="pcard-list" onClick={() => navigate(`/propiedades/${prop.id}`)}>
            <div className="pcard-list__accent" />
            <div className="pcard-list__img-wrap">
                <img src={prop.img} alt={prop.title} loading="lazy" className="pcard-list__img" />
                <div className="pcard-list__badges">
                    <Badge variant={prop.operation === 'Venta' ? 'venta' : 'alquiler'}>{prop.operation}</Badge>
                </div>
            </div>
            <div className="pcard-list__body">
                <div className="pcard-list__top">
                    <div className="pcard-list__meta">
                        <span className="pcard__type">{prop.type}</span>
                        {prop.new && <Badge variant="nuevo">Nuevo</Badge>}
                        {prop.featured && <Badge variant="destacada">Destacada</Badge>}
                    </div>
                    <h3 className="pcard__title">{prop.title}</h3>
                    <p className="pcard__address"><MapPin size={12} /> {prop.address}</p>
                    <p className="pcard-list__desc">{prop.desc}</p>
                </div>
                <div className="pcard-list__bottom">
                    <div className="pcard-list__features">
                        {prop.beds !== null && (
                            <span><BedDouble size={13} /> {prop.beds} dorm.</span>
                        )}
                        <span><Bath size={13} /> {prop.baths} baños</span>
                        <span><Maximize size={13} /> {prop.sqm} m²</span>
                    </div>
                    <span className="pcard__price">{formatPrice(prop.price, prop.currency)}</span>
                </div>
            </div>
        </div>
    )
}

/* ─── FILTER CHIP ────────────────────────────────────────────── */
function FilterChip({ label, active, onClick, icon: Icon }) {
    return (
        <button onClick={onClick} className={`filter-chip ${active ? 'filter-chip--active' : ''}`}>
            {Icon && <Icon size={12} />}
            {label}
        </button>
    )
}

/* ─── RANGE INPUT ────────────────────────────────────────────── */
function RangeInput({ label, min, max, value, onChange, format }) {
    const pct = ((value - min) / (max - min)) * 100
    return (
        <div className="range-input">
            <div className="range-input__header">
                <label>{label}</label>
                <span className="range-input__value">{format(value)}</span>
            </div>
            <input
                type="range" min={min} max={max}
                step={Math.round((max - min) / 20)}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                className="range-input__slider"
                style={{
                    background: `linear-gradient(to right, var(--borde) 0%, var(--borde) ${pct}%, #e5e7eb ${pct}%, #e5e7eb 100%)`,
                }}
            />
            <div className="range-input__labels">
                <span>{format(min)}</span>
                <span>{format(max)}</span>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Propiedades() {
    const [searchParams] = useSearchParams()
    const [viewMode, setViewMode] = useState('grid')
    const [search, setSearch] = useState('')

    /* Filters */
    const [selectedOps, setSelectedOps] = useState([])
    const [selectedTypes, setSelectedTypes] = useState(() => {
        const tipo = searchParams.get('tipo')
        if (!tipo) return []
        const match = TYPES.find(t => t.toLowerCase() === tipo.toLowerCase())
        return match ? [match] : []
    })
    const [maxPriceUSD, setMaxPriceUSD] = useState(500000)
    const [maxPriceARS, setMaxPriceARS] = useState(1000000)
    const [minBeds, setMinBeds] = useState(0)
    const [minSqm, setMinSqm] = useState(0)
    const [onlyFeatured, setOnlyFeatured] = useState(false)
    const [onlyNew, setOnlyNew] = useState(false)

    /* Sort */
    const [sortBy, setSortBy] = useState('relevance')
    const [sortOpen, setSortOpen] = useState(false)

    /* Mobile sidebar */
    const [sidebarOpen, setSidebarOpen] = useState(false)

    /* Favorites */
    const [favorites, setFavorites] = useState([])
    const toggleFav = (id) => setFavorites(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id])
    const toggleFilter = (arr, setArr, val) => setArr(p => p.includes(val) ? p.filter(v => v !== val) : [...p, val])

    /* Sync URL params */
    useEffect(() => {
        const tipo = searchParams.get('tipo')
        if (tipo) {
            const match = TYPES.find(t => t.toLowerCase() === tipo.toLowerCase())
            if (match) setSelectedTypes([match])
        }
    }, [searchParams])

    /* Block body scroll when sidebar open */
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [sidebarOpen])

    /* Filtered + sorted */
    const filtered = useMemo(() => {
        let list = ALL_PROPERTIES.filter(p => {
            if (search && !p.title.toLowerCase().includes(search.toLowerCase()) &&
                !p.address.toLowerCase().includes(search.toLowerCase())) return false
            if (selectedOps.length && !selectedOps.includes(p.operation)) return false
            if (selectedTypes.length && !selectedTypes.includes(p.type)) return false
            if (p.currency === 'USD' && p.price > maxPriceUSD) return false
            if (p.currency === 'ARS' && p.price > maxPriceARS) return false
            if (minBeds > 0 && (p.beds === null || p.beds < minBeds)) return false
            if (minSqm > 0 && p.sqm < minSqm) return false
            if (onlyFeatured && !p.featured) return false
            if (onlyNew && !p.new) return false
            return true
        })
        switch (sortBy) {
            case 'price-asc': return [...list].sort((a, b) => a.currency === b.currency ? a.price - b.price : a.currency === 'USD' ? -1 : 1)
            case 'price-desc': return [...list].sort((a, b) => a.currency === b.currency ? b.price - a.price : b.currency === 'USD' ? -1 : 1)
            case 'sqm-desc': return [...list].sort((a, b) => b.sqm - a.sqm)
            case 'newest': return [...list].sort((a, b) => a.age - b.age)
            default: return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        }
    }, [search, selectedOps, selectedTypes, maxPriceUSD, maxPriceARS, minBeds, minSqm, onlyFeatured, onlyNew, sortBy])

    const activeCount = selectedOps.length + selectedTypes.length +
        (onlyFeatured ? 1 : 0) + (onlyNew ? 1 : 0) +
        (maxPriceUSD < 500000 ? 1 : 0) + (maxPriceARS < 1000000 ? 1 : 0) +
        (minBeds > 0 ? 1 : 0) + (minSqm > 0 ? 1 : 0)

    const clearAll = () => {
        setSelectedOps([]); setSelectedTypes([])
        setMaxPriceUSD(500000); setMaxPriceARS(1000000)
        setMinBeds(0); setMinSqm(0)
        setOnlyFeatured(false); setOnlyNew(false); setSearch('')
    }

    /* ── FILTER PANEL ── */
    const FilterPanel = () => (
        <div className="fpanel">
            {/* Operación */}
            <div className="fpanel__group">
                <p className="fpanel__label">Operación</p>
                {OPERATIONS.map(op => (
                    <label key={op} className="fpanel__check" onClick={() => toggleFilter(selectedOps, setSelectedOps, op)}>
                        <div className={`fpanel__box ${selectedOps.includes(op) ? 'fpanel__box--on' : ''}`}>
                            {selectedOps.includes(op) && <CheckCircle2 size={12} />}
                        </div>
                        <span>{op}</span>
                    </label>
                ))}
            </div>

            <div className="fpanel__divider" />

            {/* Tipo */}
            <div className="fpanel__group">
                <p className="fpanel__label">Tipo de propiedad</p>
                {TYPES.map(t => {
                    const Icon = TYPE_ICONS[t]
                    return (
                        <label key={t} className="fpanel__check" onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)}>
                            <div className={`fpanel__box ${selectedTypes.includes(t) ? 'fpanel__box--on' : ''}`}>
                                {selectedTypes.includes(t) && <CheckCircle2 size={12} />}
                            </div>
                            <Icon size={14} className="fpanel__check-icon" />
                            <span>{t}</span>
                        </label>
                    )
                })}
            </div>

            <div className="fpanel__divider" />

            {/* Precio USD */}
            <RangeInput
                label="Precio máx. (USD)"
                min={50000} max={500000} value={maxPriceUSD}
                onChange={setMaxPriceUSD}
                format={v => `USD ${(v / 1000).toFixed(0)}K`}
            />

            {/* Precio ARS */}
            <RangeInput
                label="Precio máx. (ARS/mes)"
                min={100000} max={1000000} value={maxPriceARS}
                onChange={setMaxPriceARS}
                format={v => `$${(v / 1000).toFixed(0)}K`}
            />

            <div className="fpanel__divider" />

            {/* Dormitorios */}
            <div className="fpanel__group">
                <p className="fpanel__label">Dormitorios mínimos</p>
                <div className="fpanel__beds">
                    {[0, 1, 2, 3, 4].map(n => (
                        <button key={n} onClick={() => setMinBeds(n)} className={`fpanel__bed-btn ${minBeds === n ? 'fpanel__bed-btn--on' : ''}`}>
                            {n === 0 ? 'Todos' : n + '+'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Superficie */}
            <RangeInput
                label="Superficie mínima"
                min={0} max={500} value={minSqm}
                onChange={setMinSqm}
                format={v => `${v} m²`}
            />

            <div className="fpanel__divider" />

            {/* Quick filters */}
            <div className="fpanel__group">
                <p className="fpanel__label">Filtros rápidos</p>
                <label className="fpanel__check" onClick={() => setOnlyFeatured(v => !v)}>
                    <div className={`fpanel__box ${onlyFeatured ? 'fpanel__box--on' : ''}`}>
                        {onlyFeatured && <CheckCircle2 size={12} />}
                    </div>
                    <span>Solo destacadas</span>
                </label>
                <label className="fpanel__check" onClick={() => setOnlyNew(v => !v)}>
                    <div className={`fpanel__box ${onlyNew ? 'fpanel__box--on' : ''}`}>
                        {onlyNew && <CheckCircle2 size={12} />}
                    </div>
                    <span>Nuevo ingreso</span>
                </label>
            </div>

            {activeCount > 0 && (
                <button onClick={clearAll} className="fpanel__clear">
                    Limpiar filtros ({activeCount})
                </button>
            )}
        </div>
    )

    return (
        <div className="propiedades-page">

            {/* ── HEADER ── */}
            <div className="prop-header">
                <div className="prop-header__inner">
                    <span className="prop-header__tag">Catálogo completo</span>
                    <h1 className="prop-header__title">Propiedades en Santa Fe</h1>
                    <p className="prop-header__sub">{ALL_PROPERTIES.length} propiedades disponibles · Encontrá la tuya</p>
                </div>
            </div>

            {/* ── SEARCH BAR ── */}
            <div className="search-bar">
                <div className="search-bar__inner">
                    <div className="search-bar__input-wrap">
                        <Search size={16} className="search-bar__icon" />
                        <input
                            type="text"
                            placeholder="Buscar por dirección o título..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-bar__input"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="search-bar__clear"><X size={14} /></button>
                        )}
                    </div>

                    {/* Mobile filter toggle */}
                    <button onClick={() => setSidebarOpen(true)} className="search-bar__mobile-filter">
                        <SlidersHorizontal size={14} />
                        Filtros
                        {activeCount > 0 && <span className="search-bar__filter-count">{activeCount}</span>}
                    </button>

                    {/* Desktop sort + view */}
                    <div className="search-bar__desktop-controls">
                        <div className="sort-dropdown">
                            <button onClick={() => setSortOpen(v => !v)} className="sort-dropdown__btn">
                                <ArrowUpDown size={13} />
                                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                                <ChevronDown size={12} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                            </button>
                            {sortOpen && (
                                <div className="sort-dropdown__menu">
                                    {SORT_OPTIONS.map(opt => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                                            className={`sort-dropdown__option ${sortBy === opt.value ? 'sort-dropdown__option--active' : ''}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="view-toggle">
                            <button onClick={() => setViewMode('grid')} className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--on' : ''}`}>
                                <Grid3X3 size={15} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--on' : ''}`}>
                                <List size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick chips */}
                <div className="search-bar__chips">
                    {OPERATIONS.map(op => (
                        <FilterChip key={op} label={op} active={selectedOps.includes(op)} onClick={() => toggleFilter(selectedOps, setSelectedOps, op)} />
                    ))}
                    <span className="search-bar__chip-divider" />
                    {TYPES.map(t => (
                        <FilterChip key={t} label={t} active={selectedTypes.includes(t)} onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)} icon={TYPE_ICONS[t]} />
                    ))}
                </div>
            </div>

            {/* ── MAIN LAYOUT ── */}
            <div className="prop-layout">

                {/* Desktop sidebar */}
                <aside className="prop-sidebar">
                    <div className="prop-sidebar__inner">
                        <div className="prop-sidebar__header">
                            <span className="prop-sidebar__title"><Filter size={14} /> Filtros</span>
                            {activeCount > 0 && (
                                <button onClick={clearAll} className="prop-sidebar__clear-btn">Limpiar ({activeCount})</button>
                            )}
                        </div>
                        <FilterPanel />
                    </div>
                </aside>

                {/* Results */}
                <div className="prop-results">
                    {/* Results header */}
                    <div className="prop-results__header">
                        <p>
                            <strong>{filtered.length}</strong> {filtered.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                        </p>
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="prop-results__mobile-sort"
                        >
                            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                    </div>

                    {/* Active tags */}
                    {activeCount > 0 && (
                        <div className="prop-results__tags">
                            {selectedOps.map(f => (
                                <span key={f} className="result-tag">
                                    {f} <button onClick={() => toggleFilter(selectedOps, setSelectedOps, f)}><X size={10} /></button>
                                </span>
                            ))}
                            {selectedTypes.map(f => (
                                <span key={f} className="result-tag">
                                    {f} <button onClick={() => toggleFilter(selectedTypes, setSelectedTypes, f)}><X size={10} /></button>
                                </span>
                            ))}
                            {onlyFeatured && (
                                <span className="result-tag">Destacadas <button onClick={() => setOnlyFeatured(false)}><X size={10} /></button></span>
                            )}
                            {onlyNew && (
                                <span className="result-tag result-tag--green">Nuevas <button onClick={() => setOnlyNew(false)}><X size={10} /></button></span>
                            )}
                        </div>
                    )}

                    {/* Cards */}
                    {filtered.length === 0 ? (
                        <div className="prop-empty">
                            <Search size={28} />
                            <h3>Sin resultados</h3>
                            <p>No encontramos propiedades con esos filtros.</p>
                            <button onClick={clearAll} className="prop-empty__btn">Limpiar filtros <X size={14} /></button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <div className="prop-grid">
                            {filtered.map(p => (
                                <PropertyCardGrid key={p.id} prop={p} onFavorite={toggleFav} isFavorite={favorites.includes(p.id)} />
                            ))}
                        </div>
                    ) : (
                        <div className="prop-list">
                            {filtered.map(p => (
                                <PropertyCardList key={p.id} prop={p} onFavorite={toggleFav} isFavorite={favorites.includes(p.id)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── MOBILE SIDEBAR DRAWER ── */}
            {sidebarOpen && (
                <div className="mobile-drawer-overlay" onClick={() => setSidebarOpen(false)}>
                    <div className="mobile-drawer" onClick={e => e.stopPropagation()}>
                        <div className="mobile-drawer__header">
                            <span><Filter size={15} /> Filtros avanzados</span>
                            <button onClick={() => setSidebarOpen(false)} className="mobile-drawer__close"><X size={16} /></button>
                        </div>
                        <div className="mobile-drawer__body">
                            <FilterPanel />
                            <button onClick={() => setSidebarOpen(false)} className="mobile-drawer__apply">
                                Ver {filtered.length} {filtered.length === 1 ? 'propiedad' : 'propiedades'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}