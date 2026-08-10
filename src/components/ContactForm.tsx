import { useState } from 'react';
import {
  validateContactForm,
  sanitizeInput,
  RateLimiter,
  type ValidationError,
} from '../utils/validation';
import { Button } from './ui/Button';
import { Mail } from 'lucide-react';

const rateLimiter = new RateLimiter(3, 60000); // 3 attempts per 60 seconds

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
  errors: ValidationError[];
}

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [state, setState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
    errors: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizeInput(value),
    }));
    // Clear errors on input change
    setState((prev) => ({
      ...prev,
      errors: prev.errors.filter((err) => err.field !== name),
      error: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit
    if (!rateLimiter.isAllowed('contact-form')) {
      const remaining = rateLimiter.getRemainingTime('contact-form');
      setState({
        loading: false,
        success: false,
        error: `Too many requests. Please try again in ${Math.ceil(remaining / 1000)} seconds.`,
        errors: [],
      });
      return;
    }

    // Validate form
    const validationErrors = validateContactForm(formData);
    if (validationErrors.length > 0) {
      setState({
        loading: false,
        success: false,
        error: 'Please fix the errors below',
        errors: validationErrors,
      });
      return;
    }

    setState({ loading: true, success: false, error: null, errors: [] });

    try {
      // Fallback: Open email client if no backend
      const contactEmail =
        (import.meta as any).env?.VITE_CONTACT_EMAIL || 'saitarrunpitta@gmail.com';
      const mailtoLink = `mailto:${contactEmail}?subject=Portfolio Contact: ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;

      // Try to send via API if available
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to send');

        setState({
          loading: false,
          success: true,
          error: null,
          errors: [],
        });
        setFormData({ name: '', email: '', message: '' });
      } catch {
        // Fallback to mailto
        window.location.href = mailtoLink;
        setState({
          loading: false,
          success: true,
          error: null,
          errors: [],
        });
      }
    } catch {
      setState({
        loading: false,
        success: false,
        error: 'Failed to send message. Please try again.',
        errors: [],
      });
    }
  };

  const getFieldError = (fieldName: string) => {
    return state.errors.find((err) => err.field === fieldName)?.message;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl mx-auto">
      {/* Name */}
      <div className="relative pt-6">
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder=" "
          disabled={state.loading}
          required
          className="peer w-full px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          maxLength={100}
        />
        <label
          htmlFor="name"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-base font-semibold pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0e0e0e] px-2 rounded"
        >
          Name
        </label>
        {getFieldError('name') && (
          <span className="text-xs text-error mt-2 block">{getFieldError('name')}</span>
        )}
      </div>

      {/* Email */}
      <div className="relative pt-6">
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=" "
          disabled={state.loading}
          required
          className="peer w-full px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          maxLength={254}
        />
        <label
          htmlFor="email"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-base font-semibold pointer-events-none transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs bg-[#0e0e0e] px-2 rounded"
        >
          Email
        </label>
        {getFieldError('email') && (
          <span className="text-xs text-error mt-2 block">{getFieldError('email')}</span>
        )}
      </div>

      {/* Message */}
      <div className="relative pt-6">
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder=" "
          disabled={state.loading}
          required
          rows={6}
          className="peer w-full px-4 py-3 bg-surface-container-low/40 border border-white/10 rounded-lg text-on-surface placeholder-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
          maxLength={5000}
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-9 text-on-surface-variant text-base font-semibold pointer-events-none transition-all duration-300 peer-placeholder-shown:top-9 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs bg-[#0e0e0e] px-2 rounded"
        >
          Message
        </label>
        <div className="text-[10px] text-on-surface-variant mt-1 text-right">{formData.message.length}/5000</div>
        {getFieldError('message') && (
          <span className="text-xs text-error mt-1 block">{getFieldError('message')}</span>
        )}
      </div>

      {/* Error message */}
      {state.error && !state.success && (
        <div className="px-4 py-3 bg-error/10 border border-error/50 rounded-lg text-error text-sm">
          {state.error}
        </div>
      )}

      {/* Success message */}
      {state.success && (
        <div className="px-4 py-3 bg-primary/10 border border-primary/50 rounded-lg text-primary text-sm">
          Message sent! I'll get back to you soon.
        </div>
      )}

      {/* Submit button */}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        icon={<Mail className="w-5 h-5" />}
        onClick={() => {}} // form submission handled by onSubmit
      >
        {state.loading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

