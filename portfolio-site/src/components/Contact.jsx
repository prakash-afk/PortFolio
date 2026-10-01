import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { PORTFOLIO } from '../content';
import { ANIM } from '../utils/animations';

const EJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (EJS_PUBLIC_KEY) emailjs.init(EJS_PUBLIC_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── Toast ────────────────────────────────────────────────
function Toast({ type, message }) {
  return (
    <motion.div
      role="alert"
      aria-live="assertive"
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.94 }}
      transition={{ duration: 0.28, ease: ANIM.ease }}
      className={`fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-sm font-medium max-w-[calc(100vw-2rem)] sm:max-w-sm ${
        type === 'success'
          ? 'bg-emerald-950 border-emerald-500/25 text-emerald-300'
          : 'bg-red-950 border-red-500/25 text-red-300'
      }`}
    >
      {type === 'success'
        ? <CheckCircle size={17} className="flex-shrink-0" />
        : <XCircle    size={17} className="flex-shrink-0" />
      }
      <span>{message}</span>
    </motion.div>
  );
}

// ─── Field component ──────────────────────────────────────
function Field({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[10px] font-bold tracking-[0.18em] uppercase text-[--muted]"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          className="text-red-400 text-xs"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Contact Section ──────────────────────────────────────
export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [toast,  setToast]  = useState(null);

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4500);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                           e.name    = 'Name is required.';
    if (!EMAIL_RE.test(form.email.trim()))            e.email   = 'Enter a valid email address.';
    if (form.message.trim().length < 10)              e.message = 'Message must be at least 10 characters.';
    if (form.message.trim().length > 1000)            e.message = 'Message must be 1000 characters or fewer.';
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Honeypot
    if (e.target._gotcha?.value) return;

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus('sending');
    try {
      await emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
        from_name:  form.name.trim(),
        from_email: form.email.trim(),
        message:    form.message.trim(),
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      showToast('success', "Message sent! I'll get back to you soon.");
    } catch {
      setStatus('error');
      showToast('error', `Failed to send. Email me at ${PORTFOLIO.contact.email}`);
    } finally {
      setTimeout(() => setStatus('idle'), 3200);
    }
  };

  const btnLabel =
    status === 'sending' ? 'Sending...' :
    status === 'success' ? 'Sent!'      :
    'Send Message';

  const { contact, social } = PORTFOLIO;

  return (
    <section
      id="contact"
      className="py-24 sm:py-32"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left: info ── */}
          <motion.div
            initial={{ opacity: 0, y: ANIM.revealY }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIM.duration.slow, ease: ANIM.ease }}
          >
            <span className="section-label">CONTACT</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold tracking-tight mb-5">
              {contact.heading}
            </h2>
            <p className="text-[--muted] text-base sm:text-[1.05rem] leading-relaxed mb-8">
              {contact.desc}
            </p>

            {/* Social buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href={social.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.1] text-[--text] hover:border-accent hover:text-accent hover:scale-102 transition-all text-sm font-semibold group max-w-full"
                style={{ background: 'var(--card)' }}
              >
                <img
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  className="w-5 h-5 rounded-full object-contain group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.6)] transition-all flex-shrink-0"
                />
                <span>LinkedIn</span>
              </a>
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.1] text-[--text] hover:border-accent hover:text-accent hover:scale-102 transition-all text-sm font-semibold group max-w-full break-all sm:break-normal"
                  style={{ background: 'var(--card)' }}
                >
                  <img
                    src="/icons/gmail.png"
                    alt="Gmail"
                    className="w-5 h-5 rounded-full object-contain group-hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.6)] transition-all flex-shrink-0"
                  />
                  <span>{contact.email}</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.form
            initial={{ opacity: 0, y: ANIM.revealY }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: ANIM.duration.slow, delay: 0.1, ease: ANIM.ease }}
            onSubmit={onSubmit}
            noValidate
            aria-label="Contact form"
            className="flex flex-col gap-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="_gotcha"
              style={{ display: 'none' }}
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />

            <Field id="name" label="Name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                autoComplete="name"
                className="form-field"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="your@email.com"
                autoComplete="email"
                className="form-field"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </Field>

            <Field id="message" label="Message" error={errors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="Your message (10–1000 characters)"
                minLength={10}
                maxLength={1000}
                className="form-field resize-y"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
            </Field>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[44px] bg-accent text-white font-bold rounded-xl hover:bg-accent/90 hover:shadow-glow disabled:opacity-55 disabled:cursor-not-allowed transition-all duration-200 text-sm w-full sm:w-auto self-start"
            >
              {status === 'sending' && <Loader2 size={15} className="animate-spin" />}
              {status === 'success' && <CheckCircle size={15} />}
              {status === 'idle'    && <Send size={15} />}
              {btnLabel}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && <Toast type={toast.type} message={toast.msg} />}
      </AnimatePresence>
    </section>
  );
}
