import { useState } from 'react'
import ProductCarousel from './components/ProductCarousel/ProductCarousel'
import { products } from './data/products'
import './App.css'

const categories = [
  {
    label: "Women's",
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&h=800&fit=crop',
  },
  {
    label: "Men's",
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&h=800&fit=crop',
  },
  {
    label: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop',
  },
]

const instagramPhotos = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&h=400&fit=crop',
]

function FooterCol({ heading, links }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="site-footer__col">
      <button
        className="site-footer__col-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {heading}
        <span className="site-footer__col-toggle" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <nav className={`site-footer__col-links${open ? ' is-open' : ''}`}>
        {links.map((link) => (
          <a key={link} href="#">{link}</a>
        ))}
      </nav>
    </div>
  )
}

function App() {
  return (
    <div className="app">

      <div className="announcement-bar">
        Free shipping on all orders
      </div>

      <header className="site-header">
        <div className="site-header__inner">
          <button className="site-header__menu-btn" aria-label="Open menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>

          <span className="site-header__logo">logo</span>

          <nav className="site-header__nav" aria-label="Main navigation">
            <a href="#">Men's</a>
            <a href="#">Women's</a>
            <a href="#">Accessories</a>
            <a href="#">Sale!</a>
          </nav>

          <div className="site-header__icons">
            <button className="site-header__icon-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="site-header__icon-btn" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="site-header__icon-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 2h2l2.4 9.6a2 2 0 001.93 1.4H14a2 2 0 001.93-1.47L17 6H5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8" cy="17" r="1.5" fill="currentColor"/>
                <circle cx="14" cy="17" r="1.5" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <section className="hero" aria-label="Our Fave Tees">
        <img
          className="hero__image"
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=700&fit=crop"
          alt="Clothes on a rack"
        />
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Our Fave Tees</h1>
            <p className="hero__subtitle">Shop all of our favorites.</p>
            <a href="#" className="btn btn--dark">Shop Now</a>
          </div>
        </div>
        <div className="hero__dots" aria-hidden="true">
          <span className="hero__dot hero__dot--active" />
          <span className="hero__dot" />
        </div>
      </section>

      <div className="category-grid">
        {categories.map((cat) => (
          <a key={cat.label} href="#" className="category-grid__item">
            <img className="category-grid__image" src={cat.image} alt={cat.label} loading="lazy" />
            <div className="category-grid__label">{cat.label}</div>
          </a>
        ))}
      </div>

      <ProductCarousel title="New Arrivals" products={products} />

      <section className="promo-banner" aria-label="Our Favorite Tees">
        <img
          className="promo-banner__image"
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=700&fit=crop"
          alt="Model wearing a white tee"
          loading="lazy"
        />
        <div className="promo-banner__overlay">
          <div className="promo-banner__content">
            <h2 className="promo-banner__title">Our Favorite Tees</h2>
            <p className="promo-banner__subtitle">Everyday tees you need.</p>
            <a href="#" className="btn btn--teal">Shop Now</a>
          </div>
        </div>
      </section>

      <section className="instagram-section">
        <h2 className="section-title">Follow Us On Instagram!</h2>
        <div className="instagram-grid">
          {instagramPhotos.map((src, i) => (
            <a key={i} href="#" className="instagram-grid__item" aria-label={`Instagram photo ${i + 1}`}>
              <img src={src} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter__icon" aria-hidden="true">✉</div>
        <h2 className="newsletter__title">Sign Up &amp; Slay Connected</h2>
        <p className="newsletter__subtitle">
          Sign up for the newsletter and get 20% off! Gain access to exclusive
          offers and be the first to know when new stuff drops!
        </p>
        <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="newsletter__input"
            type="email"
            placeholder="Your email address"
            aria-label="Email address"
            required
          />
          <button type="submit" className="newsletter__submit">Subscribe</button>
        </form>
      </section>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__columns">
            <FooterCol
              heading="Customer Service"
              links={['Accessibility', 'Contact Us', 'Return Policy', 'FAQ', 'Gift Certificates', 'Wishlist']}
            />
            <FooterCol
              heading="Company"
              links={['About Us', 'Careers', 'Press', 'Affiliates']}
            />
            <div className="site-footer__col">
              <button className="site-footer__col-header" style={{ cursor: 'default' }}>
                Follow Us
              </button>
              <div className="site-footer__social">
                <a href="#" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4.5"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <p className="site-footer__bottom">© {new Date().getFullYear()} DYODE. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

export default App
