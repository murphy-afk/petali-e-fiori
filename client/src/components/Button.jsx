import { Link } from "react-router-dom";
import "./Button.css";

// One visual language for every action: it renders an internal link, an
// external link or a button depending on what it is given.
export default function Button({
  variant = "primary",
  to,
  href,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = ["button", "button--" + variant, className].filter(Boolean).join(" ");

  if (to) {
    return (
      <Link className={classes} to={to} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...rest}>
      {children}
    </button>
  );
}
