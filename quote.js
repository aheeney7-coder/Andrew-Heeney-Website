(function () {
  'use strict';
  function normalizePhone(value) {
    let phone = value.trim().replace(/[\s().-]/g, '');
    if (phone.startsWith('00')) phone = '+' + phone.slice(2);
    if (/^0[1-9]\d{7,9}$/.test(phone)) phone = '+353' + phone.slice(1);
    if (/^353\d{8,9}$/.test(phone)) phone = '+' + phone;
    return /^\+[1-9]\d{7,14}$/.test(phone) ? phone.slice(1) : null;
  }
  function buildReply(values) {
    const date = /^\d{4}-\d{2}-\d{2}$/.test(values.date || '')
      ? values.date.split('-').reverse().join('/') : '';
    return `Hi ${values.name}, thanks for your quote request for ${values.service}${date ? ' on ' + date : ''}${values.location ? ' — ' + values.location : ''}.\n\nYour brief: ${values.message}${values.budget ? '\nBudget: ' + values.budget : ''}\n\nI’ll review the details and confirm availability and a tailored quote. Is there anything else you’d like me to include?\n\nAndrew | Andrew Heeney Media`;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {normalizePhone, buildReply};
  if (typeof document === 'undefined') return;
  const form = document.getElementById('enquiryForm');
  if (!form) return;
  const phoneInput = document.getElementById('f-phone');
  phoneInput.addEventListener('input', () => phoneInput.setCustomValidity(''));
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const phone = normalizePhone(phoneInput.value);
    phoneInput.setCustomValidity(phone ? '' : 'Enter an Irish number starting with 0, or an international number with + and its country code.');
    if (!form.reportValidity()) return;
    const success = document.getElementById('quote-success');
    const error = document.getElementById('quote-error');
    const button = form.querySelector('button[type="submit"]');
    success.textContent = error.textContent = '';
    button.disabled = true;
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    for (const field of ['name', 'service', 'location', 'message', 'budget']) values[field] = String(values[field] || '').trim();
    const reply = buildReply(values);
    data.set('_subject', `Quote request: ${values.service} — ${values.name}`);
    data.set('WhatsApp reply — click to open prepared message', `https://wa.me/${phone}?text=${encodeURIComponent(reply)}`);
    data.set('Prepared WhatsApp message', reply);
    data.set('phone', '+' + phone);
    try {
      const response = await fetch(form.action, {method: 'POST', body: data, headers: {'Accept': 'application/json'}});
      const result = await response.json();
      if (!response.ok || result.errors || result.ok === false) throw new Error('Submission failed');
      success.textContent = 'Thanks — your quote request has been sent. I’ll be in touch by email or WhatsApp after reviewing your project.';
      form.reset();
      success.scrollIntoView({behavior: 'smooth', block: 'center'});
    } catch (_) {
      error.textContent = 'Your request could not be sent. Please try again, or contact me using the email or WhatsApp links alongside this form. Your details are still here.';
    } finally {
      button.disabled = false;
    }
  });
})();
