/**
 * EMAILJS — one wrapper for every form on the site.
 * Credentials come from .env only. When EmailJS is not configured the
 * caller gets a structured failure so it can offer the WhatsApp fallback.
 */
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { emailjs as emailjsConfig, isEmailjsConfigured, site, contact } from '../data/siteConfig.js';
import { buildWhatsAppUrl } from './whatsapp.js';

/** Dark theme shared by every SweetAlert2 dialog. */
export const swalTheme = {
  background: '#151515',
  color: '#d5d5d5',
  confirmButtonColor: '#FF5A1F',
  cancelButtonColor: '#303030',
};

const toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3200,
  timerProgressBar: true,
  background: '#151515',
  color: '#d5d5d5',
  didOpen: (el) => {
    el.addEventListener('mouseenter', Swal.stopTimer);
    el.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

/**
 * Send a form payload through EmailJS.
 * @param {HTMLFormElement|Record<string, any>} formOrData
 * @param {{ context?:string }} options
 * @returns {Promise<{ok:boolean, reason?:'not-configured'|'error', error?:any}>}
 */
export async function sendEmail(formOrData, { context = 'enquiry' } = {}) {
  if (!isEmailjsConfigured) {
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const payload =
      formOrData instanceof HTMLFormElement
        ? formOrData
        : { ...formOrData, source: 'website', page: context, site: site.name };

    const response =
      formOrData instanceof HTMLFormElement
        ? await emailjs.sendForm(emailjsConfig.serviceId, emailjsConfig.templateId, formOrData, {
            publicKey: emailjsConfig.publicKey,
          })
        : await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, payload, {
            publicKey: emailjsConfig.publicKey,
          });

    if (response?.status === 200) return { ok: true };
    return { ok: false, reason: 'error', error: new Error(`EmailJS status ${response?.status}`) };
  } catch (error) {
    return { ok: false, reason: 'error', error };
  }
}

/** Success dialog with an optional WhatsApp follow-up. */
export function showSuccess({ title = 'Submitted', text, whatsappText }) {
  const buttons = {};
  if (whatsappText) {
    buttons.denyButtonText = 'Send on WhatsApp';
  }
  return Swal.fire({
    icon: 'success',
    title,
    text,
    ...swalTheme,
    confirmButtonText: 'Done',
    showDenyButton: Boolean(whatsappText),
    denyButtonText: whatsappText ? 'Also send on WhatsApp' : '',
    reverseButtons: true,
  }).then((result) => {
    if (result.isDenied && whatsappText) {
      window.open(buildWhatsAppUrl(whatsappText), '_blank', 'noopener,noreferrer');
    }
  });
}

/** Failure dialog that always offers the WhatsApp fallback. */
export function showFailure({ title = 'Something went wrong', text, whatsappText, onRetry }) {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    ...swalTheme,
    showCancelButton: Boolean(whatsappText),
    confirmButtonText: onRetry ? 'Try again' : 'Close',
    cancelButtonText: whatsappText ? 'Continue on WhatsApp' : '',
    reverseButtons: true,
  }).then((result) => {
    if (result.isDismissed && whatsappText) {
      window.open(buildWhatsAppUrl(whatsappText), '_blank', 'noopener,noreferrer');
    }
    if (result.isConfirmed && onRetry) onRetry();
  });
}

/**
 * EmailJS is not configured yet. WhatsApp is a real delivery channel here, so
 * this is not a failure — ask the user to continue there instead.
 * Resolves `true` only if the WhatsApp window was actually opened.
 */
export function showWhatsAppFallback({ title = 'Continue on WhatsApp', whatsappText, note }) {
  return Swal.fire({
    icon: 'info',
    title,
    text: note || notConfiguredMessage(),
    ...swalTheme,
    showCancelButton: true,
    confirmButtonText: 'Open WhatsApp',
    cancelButtonText: 'Go back',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed && whatsappText) {
      window.open(buildWhatsAppUrl(whatsappText), '_blank', 'noopener,noreferrer');
      return true;
    }
    return false;
  });
}

export function showInfo(title, text) {
  return Swal.fire({ icon: 'info', title, text, ...swalTheme, confirmButtonText: 'Got it' });
}

export function showToast(message, icon = 'success') {
  return toast.fire({ icon, title: message });
}

/** Standard "EmailJS is not set up yet" guidance. */
export function notConfiguredMessage() {
  return `Email delivery is not configured yet (${contact.email}). Please continue on WhatsApp and our team will respond.`;
}

export default { sendEmail, showSuccess, showFailure, showInfo, showToast, swalTheme };
