import { useRef, useState } from "react";
import { ApiError, api } from "../api/client.js";
import { useSetting } from "../context/SettingsContext.jsx";
import Button from "./Button.jsx";
import "./ContactForm.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY_VALUES = {
  name: "",
  email: "",
  phone: "",
  wedding_date: "",
  venue: "",
  message: "",
  website: "",
};

const FIELDS = [
  { name: "name", label: "Nome e Cognome", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "E-mail", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Telefono", type: "tel", autoComplete: "tel" },
  { name: "wedding_date", label: "Data del Matrimonio", type: "date" },
  { name: "venue", label: "Luogo dell'Evento", type: "text", autoComplete: "off" },
];

// The same rules the server applies, the visitor sees them before sending.
function validate(values) {
  const errors = {};

  if (!values.name.trim()) errors.name = "Il nome e il cognome sono obbligatori.";
  else if (values.name.trim().length > 120) errors.name = "Il nome è troppo lungo.";

  if (!values.email.trim()) errors.email = "L'indirizzo e-mail è obbligatorio.";
  else if (values.email.trim().length > 190) errors.email = "L'indirizzo e-mail è troppo lungo.";
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = "Inserite un indirizzo e-mail valido.";

  if (values.phone.trim().length > 40) errors.phone = "Il numero di telefono è troppo lungo.";
  if (values.venue.trim().length > 190) errors.venue = "Il luogo dell'Evento è troppo lungo.";

  if (values.wedding_date && Number.isNaN(Date.parse(values.wedding_date)))
    errors.wedding_date = "Inserite una data valida.";

  if (!values.message.trim()) errors.message = "Il messaggio è obbligatorio.";
  else if (values.message.trim().length > 5000) errors.message = "Il messaggio è troppo lungo.";

  return errors;
}

// Contact form wired to POST /api/contact. It validates before sending, shows
// the errors returned by the server on the matching field and confirms the
// message with an inline panel.
export default function ContactForm({ className = "" }) {
  const hint = useSetting("contact_hint");
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [notice, setNotice] = useState("");
  const fieldRefs = useRef({});

  const classes = ["contact-form", className].filter(Boolean).join(" ");

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function focusFirstInvalid(fieldErrors) {
    const first = Object.keys(fieldErrors)[0];
    const node = first ? fieldRefs.current[first] : null;
    if (node) node.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setNotice("");
      focusFirstInvalid(clientErrors);
      return;
    }

    setStatus("sending");
    setNotice("");

    try {
      const payload = await api.contact({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        wedding_date: values.wedding_date,
        venue: values.venue.trim(),
        message: values.message.trim(),
        website: values.website,
      });
      setStatus("success");
      setNotice(payload.message);
    } catch (error) {
      setStatus("error");
      if (error instanceof ApiError && Object.keys(error.fields).length > 0) {
        setErrors(error.fields);
        focusFirstInvalid(error.fields);
      } else {
        setNotice(
          error instanceof ApiError
            ? error.message
            : "Si è verificato un errore. Riprovate più tardi."
        );
      }
    }
  }

  function resetForm() {
    setValues(EMPTY_VALUES);
    setErrors({});
    setNotice("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className={classes + " contact-form--sent"} role="status">
        <h3 className="contact-form__sent-title">Messaggio inviato</h3>
        <p className="contact-form__sent-text">{notice}</p>
        <Button variant="ghost" type="button" onClick={resetForm}>
          Invia un altro messaggio
        </Button>
      </div>
    );
  }

  return (
    <form className={classes} onSubmit={handleSubmit} noValidate>
      <p className="contact-form__required-note">
        I campi contrassegnati con <span aria-hidden="true">*</span>
        <span className="visually-hidden">asterisco</span> sono obbligatori.
      </p>

      {FIELDS.map((field) => (
        <div className="contact-form__field" key={field.name}>
          <label className="contact-form__label" htmlFor={"contatti-" + field.name}>
            {field.label}
            {field.required ? (
              <span aria-hidden="true"> *</span>
            ) : (
              <span className="contact-form__optional"> (facoltativo)</span>
            )}
          </label>
          <input
            id={"contatti-" + field.name}
            className="contact-form__input"
            type={field.type}
            name={field.name}
            value={values[field.name]}
            autoComplete={field.autoComplete}
            required={Boolean(field.required)}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? "contatti-" + field.name + "-error" : undefined}
            ref={(node) => {
              fieldRefs.current[field.name] = node;
            }}
            onChange={handleChange} />
          {errors[field.name] ? (
            <p className="contact-form__error" id={"contatti-" + field.name + "-error"}>
              {errors[field.name]}
            </p>
          ) : null}
        </div>
      ))}

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contatti-message">
          Messaggio <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contatti-message"
          className="contact-form__input contact-form__input--area"
          name="message"
          rows={7}
          value={values.message}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "contatti-message-error" : "contatti-message-hint"
          }
          ref={(node) => {
            fieldRefs.current.message = node;
          }}
          onChange={handleChange} />
        {errors.message ? (
          <p className="contact-form__error" id="contatti-message-error">
            {errors.message}
          </p>
        ) : (
          <p className="contact-form__hint" id="contatti-message-hint">{hint}</p>
        )}
      </div>

      {/* Honeypot: real visitors never see it, a bot that fills it gets a
          success answer and nothing is stored. */}
      <div className="contact-form__honeypot" aria-hidden="true">
        <label htmlFor="contatti-website">Non compilate questo campo</label>
        <input
          id="contatti-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange} />
      </div>

      {notice ? (
        <p className="contact-form__notice" role="alert">
          {notice}
        </p>
      ) : null}

      <Button variant="accent" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Invio in corso..." : "Invia il messaggio"}
      </Button>
    </form>
  );
}
