import { query } from "../db.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MAX_MESSAGE = 5000;

const SUCCESS_MESSAGE =
  "Grazie, abbiamo ricevuto il Vostro messaggio. Vi risponderemo al più presto.";

function readText(body, key) {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

// Returns an object keyed by field name, empty when the payload is valid.
function validate(body) {
  const fields = {};
  const name = readText(body, "name");
  const email = readText(body, "email");
  const message = readText(body, "message");

  if (!name) fields["name"] = "Il nome e il cognome sono obbligatori.";
  else if (name.length > 120) fields["name"] = "Il nome è troppo lungo.";

  if (!email) fields["email"] = "L'indirizzo e-mail è obbligatorio.";
  else if (email.length > 190) fields["email"] = "L'indirizzo e-mail è troppo lungo.";
  else if (!EMAIL_PATTERN.test(email))
    fields["email"] = "Inserite un indirizzo e-mail valido.";

  if (!message) fields["message"] = "Il messaggio è obbligatorio.";
  else if (message.length > MAX_MESSAGE)
    fields["message"] = "Il messaggio è troppo lungo.";

  const phone = readText(body, "phone");
  if (phone.length > 40) fields["phone"] = "Il numero di telefono è troppo lungo.";

  const venue = readText(body, "venue");
  if (venue.length > 190) fields["venue"] = "Il luogo dell'Evento è troppo lungo.";

  const weddingDate = readText(body, "wedding_date");
  if (weddingDate && (!DATE_PATTERN.test(weddingDate) || Number.isNaN(Date.parse(weddingDate))))
    fields["wedding_date"] = "Inserite una data valida.";

  return fields;
}

export async function createContact(req, res) {
  const body = req.body || {};

  // Honeypot: the real form has no "website" field, bots fill it. Answer like
  // a success so they learn nothing, but store nothing either.
  if (readText(body, "website") !== "") {
    res.status(201).json({ ok: true, message: SUCCESS_MESSAGE });
    return;
  }

  const fields = validate(body);
  if (Object.keys(fields).length > 0) {
    res.status(400).json({ error: "Controllate i campi indicati.", fields });
    return;
  }

  const weddingDate = readText(body, "wedding_date");
  await query(
    "INSERT INTO contact_messages " +
      "(name, email, phone, wedding_date, venue, message, ip_address) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      readText(body, "name"),
      readText(body, "email"),
      readText(body, "phone") || null,
      weddingDate || null,
      readText(body, "venue") || null,
      readText(body, "message"),
      req.ip || (req.socket && req.socket.remoteAddress) || null,
    ]
  );

  res.status(201).json({ ok: true, message: SUCCESS_MESSAGE });
}
