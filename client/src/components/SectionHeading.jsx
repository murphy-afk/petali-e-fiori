import "./SectionHeading.css";

// Title block that opens a section: small eyebrow, heading and optional intro.
export default function SectionHeading({
  eyebrow,
  title,
  titleAs: Title = "h2",
  intro,
  align = "left",
  className = "",
}) {
  const classes = ["section-heading", "section-heading--" + align, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <Title className="section-heading__title">{title}</Title>
      {intro ? <p className="section-heading__intro">{intro}</p> : null}
    </div>
  );
}
