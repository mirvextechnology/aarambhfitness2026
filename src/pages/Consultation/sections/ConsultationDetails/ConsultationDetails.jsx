/** ConsultationDetails — STEP 06 (personal details) and STEP 07 (requirements). */
import { AlertCircle } from 'lucide-react';

export function DetailsForm({ values, errors, touched, onChange, onBlur }) {
  const err = (key) => (touched && errors[key] ? errors[key] : '');

  return (
    <div className="cons-step">
      <div className="form-grid">
        <div className={`field ${err('name') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-name">
            Full name<span className="req">*</span>
          </label>
          <input
            id="cons-name"
            className="input"
            value={values.name}
            onChange={onChange('name')}
            onBlur={onBlur('name')}
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={Boolean(err('name'))}
          />
          {err('name') ? <p className="field__error">{errors.name}</p> : null}
        </div>

        <div className={`field ${err('phone') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-phone">
            Phone<span className="req">*</span>
          </label>
          <input
            id="cons-phone"
            className="input"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={onChange('phone')}
            onBlur={onBlur('phone')}
            placeholder="98765 43210"
            autoComplete="tel"
            aria-invalid={Boolean(err('phone'))}
          />
          {err('phone') ? <p className="field__error">{errors.phone}</p> : null}
        </div>

        <div className={`field ${err('email') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-email">
            Email<span className="req">*</span>
          </label>
          <input
            id="cons-email"
            className="input"
            type="email"
            value={values.email}
            onChange={onChange('email')}
            onBlur={onBlur('email')}
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={Boolean(err('email'))}
          />
          {err('email') ? <p className="field__error">{errors.email}</p> : null}
        </div>

        <div className={`field ${err('age') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-age">
            Age<span className="req">*</span>
          </label>
          <input
            id="cons-age"
            className="input"
            type="number"
            inputMode="numeric"
            min="12"
            max="90"
            value={values.age}
            onChange={onChange('age')}
            onBlur={onBlur('age')}
            placeholder="28"
            aria-invalid={Boolean(err('age'))}
          />
          {err('age') ? <p className="field__error">{errors.age}</p> : null}
        </div>

        <div className={`field ${err('gender') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-gender">
            Gender<span className="req">*</span>
          </label>
          <select
            id="cons-gender"
            className="select"
            value={values.gender}
            onChange={onChange('gender')}
            onBlur={onBlur('gender')}
            aria-invalid={Boolean(err('gender'))}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {err('gender') ? <p className="field__error">{errors.gender}</p> : null}
        </div>

        <div className={`field ${err('location') ? 'field--error' : ''}`}>
          <label className="field__label" htmlFor="cons-location">
            Your location<span className="req">*</span>
          </label>
          <input
            id="cons-location"
            className="input"
            value={values.location}
            onChange={onChange('location')}
            onBlur={onBlur('location')}
            placeholder="Kaurihar, Prayagraj"
            autoComplete="address-level2"
            aria-invalid={Boolean(err('location'))}
          />
          {err('location') ? <p className="field__error">{errors.location}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function RequirementsForm({ value, onChange }) {
  return (
    <div className="cons-step">
      <div className="field">
        <label className="field__label" htmlFor="cons-requirements">
          Tell us about your fitness goals or requirements.
        </label>
        <textarea
          id="cons-requirements"
          className="textarea"
          rows={7}
          value={value}
          onChange={onChange('requirements')}
          placeholder="Anything that helps us prepare — current fitness level, past injuries, medical conditions, timings that work, or questions you want answered."
        />
        <span className="field__hint">
          Optional, but the more you share the more useful the session will be.
        </span>
      </div>

      <p className="cons-step__privacy">
        <AlertCircle size={14} aria-hidden="true" />
        This is a request, not a confirmed booking. Our team will contact you to confirm the slot.
      </p>
    </div>
  );
}

export default DetailsForm;
