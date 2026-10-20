import "./Card.css";

// Generic content card: photo on top, title, short text and an optional price
// or footer. Used for services, bouquets, decorations and price examples.
export default function Card({
  image,
  alt,
  title,
  titleAs: Title = "h3",
  text,
  children,
  price,
  footer,
  className = "",
}) {
  const classes = ["card", className].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      {image ? <img className="card__image" src={image} alt={alt} loading="lazy" /> : null}
      <div className="card__body">
        {title ? <Title className="card__title">{title}</Title> : null}
        {text ? <p className="card__text">{text}</p> : null}
        {children}
        {price ? <div className="card__price">{price}</div> : null}
        {footer ? <div className="card__footer">{footer}</div> : null}
      </div>
    </article>
  );
}
