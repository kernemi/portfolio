import React, { useMemo, useState } from "react";
import ParticleBackground from "./ParticleBackground";

const Contact: React.FC = () => {
  const [_focused, setFocused] = useState({ name: false, email: false, message: false })
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const isFormValid = useMemo(() => (
    values.name.trim().length >= 2 &&
    isValidEmail(values.email) &&
    values.message.trim().length >= 10
  ), [values]);

  const handleFocus = (f: 'name'|'email'|'message') => setFocused(prev => ({ ...prev, [f]: true }));
  const handleBlur = (f: 'name'|'email'|'message', value: string) => {
    if (!value) setFocused(prev => ({ ...prev, [f]: false }));
  };

  const validate = () => {
    const n: typeof errors = {};
    if (values.name.trim().length < 2) n.name = 'Please enter at least 2 chars';
    if (!isValidEmail(values.email)) n.email = 'Invalid email';
    if (values.message.trim().length < 10) n.message = 'At least 10 chars';
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setStatus('submitting');

      // artificial delay (you had this already)
      await new Promise(r => setTimeout(r, 1000));

      // open user's email app
      const subject = `Message from ${values.name}`;
      const body =
        `Name: ${values.name}%0D%0A` +
        `Message: ${values.message}`;

      setTimeout(() => {
        window.location.href = `mailto:kernemikidane63@gmail.com?subject=${subject}&body=${body}`;
      }, 150);

      setStatus('success');

      // Reset form
      setValues({ name: '', email: '', message: '' });
      setFocused({ name: false, email: false, message: false });
      setErrors({});
    } 
    catch {
      setStatus('error');
    } 
    finally {
      // return UI to idle after animation
      setTimeout(() => setStatus('idle'), 1800);
    }
  };


  return (
    <section id="contact" className="py-0 px-0 relative overflow-hidden">
      <ParticleBackground />
      <div className="w-full h-12 mb-24 bg-gradient-to-r from-purple-900 to-blue-800"></div>
     <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-[#9b5cff]/10 border border-purple-400 transition-transform duration-300 hover:-translate-y-1">
      <h2 className="text-5xl font-bold text-center mb-8 gradient-text">Contact Me</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <input
            id="name"
            value={values.name}
            onChange={e => setValues(v => ({ ...v, name: e.target.value }))}
            onFocus={() => handleFocus('name')}
            onBlur={(e) => handleBlur('name', e.target.value)}
            placeholder="Name"
            className="w-full bg-purple-200/20 border border-purple-300 rounded-xl px-4 py-3 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition-all duration-300"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            id="email"
            value={values.email}
            onChange={e => setValues(v => ({ ...v, email: e.target.value }))}
            onFocus={() => handleFocus('email')}
            onBlur={(e) => handleBlur('email', e.target.value)}
            placeholder="Email"
            className="w-full bg-purple-200/20 border border-purple-300 rounded-xl px-4 py-3 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition-all duration-300"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Message */}
        <div>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={e => setValues(v => ({ ...v, message: e.target.value }))}
            onFocus={() => handleFocus('message')}
            onBlur={(e) => handleBlur('message', e.target.value)}
            placeholder="Message"
            className="w-full bg-purple-200/20 border border-purple-300 rounded-xl px-4 py-3 placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition-all duration-300"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || status === 'submitting'}
          className={`w-full py-3 rounded-xl text-black font-semibold text-lg transition-all duration-300 clickedbtn`}
        >
          {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
        </button>

        {/* Error Message */}
        {status === 'error' && <p className="text-red-400 text-center mt-2">Something went wrong</p>}
      </form>
    </div>

    <div className="w-full h-12"></div>
    </section>
  );
};

export default Contact;
