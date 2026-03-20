import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductCarousel.css'

// Chevrons: first tap moves one card; hold repeats after a short delay.
const HOLD_MS = 280
const REPEAT_MS = 320
// When you're in the cloned strip at the ends, jump back by one "set" width (invisible reset).
const LOOP_EDGE = 32

function ChevronIcon({ direction }) {
  return (
    <svg
      className="product-carousel__chevron-svg"
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
      aria-hidden="true"
    >
      {direction === 'prev' ? (
        <path
          d="M8 3L3 11l5 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4 3l5 8-5 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

/** One slide + grid gap, measured from the live DOM */
function slideStepPx(viewportEl) {
  const slide = viewportEl.querySelector('.product-carousel__slide')
  if (!slide) return 0
  const g = getComputedStyle(viewportEl)
  const gap = parseFloat(g.columnGap || g.gap || '0') || 0
  return slide.getBoundingClientRect().width + gap
}

function ProductCarousel({ products = [], title, variant = 'default' }) {
  const viewportRef = useRef(null)
  const headingId = useId()
  const regionId = useId()
  const afterHoldTimer = useRef(null)
  const repeatTimer = useRef(null)
  const prefersReducedMotion = useRef(false)

  const hasSeveral = products.length > 1

  const slides = useMemo(() => {
    if (products.length <= 1) {
      return products.map((p) => ({ product: p, key: String(p.id) }))
    }
    const tripled = []
    for (let copy = 0; copy < 3; copy += 1) {
      products.forEach((p, i) => {
        tripled.push({ product: p, key: `${copy}-${p.id}-${i}` })
      })
    }
    return tripled
  }, [products])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      prefersReducedMotion.current = mq.matches
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const fixLoopPosition = useCallback(() => {
    const el = viewportRef.current
    if (!el || !hasSeveral) return
    const chunk = el.scrollWidth / 3
    if (chunk < 1) return
    if (el.scrollLeft >= chunk * 2 - LOOP_EDGE) {
      el.scrollLeft -= chunk
    } else if (el.scrollLeft <= LOOP_EDGE) {
      el.scrollLeft += chunk
    }
  }, [hasSeveral])

  useLayoutEffect(() => {
    const el = viewportRef.current
    if (!el || !hasSeveral) return
    const chunk = el.scrollWidth / 3
    if (chunk > 0) el.scrollLeft = chunk
  }, [hasSeveral, slides, variant])

  useEffect(() => {
    const el = viewportRef.current
    if (!el || !hasSeveral) return

    el.addEventListener('scroll', fixLoopPosition, { passive: true })
    const ro = new ResizeObserver(fixLoopPosition)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', fixLoopPosition)
      ro.disconnect()
    }
  }, [hasSeveral, fixLoopPosition])

  const clearTimers = useCallback(() => {
    clearTimeout(afterHoldTimer.current)
    afterHoldTimer.current = null
    clearInterval(repeatTimer.current)
    repeatTimer.current = null
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const nudge = useCallback(
    (dir, instant) => {
      const el = viewportRef.current
      if (!el || !hasSeveral) return
      const step = slideStepPx(el)
      if (step < 1) return
      el.scrollBy({
        left: dir === 'next' ? step : -step,
        behavior: prefersReducedMotion.current || instant ? 'auto' : 'smooth',
      })
    },
    [hasSeveral],
  )

  function onChevronDown(e, dir) {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    if (!hasSeveral) return
    e.currentTarget.setPointerCapture(e.pointerId)

    nudge(dir, false)
    if (prefersReducedMotion.current) return

    clearTimers()
    afterHoldTimer.current = setTimeout(() => {
      afterHoldTimer.current = null
      repeatTimer.current = setInterval(() => nudge(dir, true), REPEAT_MS)
    }, HOLD_MS)
  }

  function onChevronUp(e) {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // ignore
    }
    clearTimers()
  }

  if (!title || products.length === 0) return null

  const variantMod =
    variant === 'compact' ? 'product-carousel--compact' : 'product-carousel--default'

  return (
    <section
      className={`product-carousel ${variantMod}`}
      aria-labelledby={headingId}
    >
      <div className="product-carousel__inner">
        <header className="product-carousel__header">
          <h2 id={headingId} className="section-title product-carousel__title">
            {title}
          </h2>
        </header>

        <div
          className="product-carousel__row"
          role="group"
          aria-label={`${title} carousel controls`}
        >
          <button
            type="button"
            className="product-carousel__chevron"
            aria-label="Previous product"
            aria-controls={regionId}
            disabled={!hasSeveral}
            onPointerDown={(e) => onChevronDown(e, 'prev')}
            onPointerUp={onChevronUp}
            onPointerCancel={onChevronUp}
            onLostPointerCapture={clearTimers}
          >
            <ChevronIcon direction="prev" />
          </button>

          <div
            id={regionId}
            ref={viewportRef}
            className="product-carousel__viewport"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={`${title} products`}
          >
            <ul className="product-carousel__track">
              {slides.map(({ product, key }) => (
                <li key={key} className="product-carousel__slide">
                  <ProductCard product={product} variant={variant} />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="product-carousel__chevron"
            aria-label="Next product"
            aria-controls={regionId}
            disabled={!hasSeveral}
            onPointerDown={(e) => onChevronDown(e, 'next')}
            onPointerUp={onChevronUp}
            onPointerCancel={onChevronUp}
            onLostPointerCapture={clearTimers}
          >
            <ChevronIcon direction="next" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductCarousel
