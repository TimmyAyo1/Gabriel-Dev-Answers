import './ProductCard.css'

function money(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(n)
}

export default function ProductCard({ product, variant = 'default' }) {
  const { title, type, price, compareAtPrice, image, available } = product
  const compact = variant === 'compact'

  let cls = 'product-card'
  if (compact) cls += ' product-card--compact'
  if (!available) cls += ' product-card--unavailable'

  const ariaPrice = [
    money(price),
    compareAtPrice != null ? `was ${money(compareAtPrice)}` : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <a
      href="#"
      className={cls}
      aria-label={`${title}, ${type}. ${ariaPrice}${!available ? '. Sold out' : ''}`}
    >
      <div className="product-card__media">
        <img
          className="product-card__image"
          src={image}
          alt=""
          loading="lazy"
          width={600}
          height={800}
        />
        {!available && (
          <span className="product-card__badge">Sold out</span>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{title}</h3>
        <p className="product-card__meta">{type}</p>
        <div className="product-card__prices">
          <span className="product-card__price">{money(price)}</span>
          {compareAtPrice != null && (
            <span className="product-card__compare-at">
              <span className="visually-hidden">Originally </span>
              {money(compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
