import crypto from 'crypto';

const FLOW_API_KEY = process.env.FLOW_API_KEY;
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY;
const FLOW_BASE_URL = process.env.FLOW_ENV === 'production'
  ? 'https://www.flow.cl/api'
  : 'https://sandbox.flow.cl/api';

function signParams(params) {
  if (!FLOW_API_KEY || !FLOW_SECRET_KEY) {
    throw new Error('Flow no está configurado: faltan FLOW_API_KEY o FLOW_SECRET_KEY');
  }
  const sortedKeys = Object.keys(params).sort();
  const toSign = sortedKeys.map((key) => `${key}${params[key]}`).join('');
  return crypto.createHmac('sha256', FLOW_SECRET_KEY).update(toSign).digest('hex');
}

function buildSignedForm(params) {
  const fullParams = { ...params, apiKey: FLOW_API_KEY };
  const s = signParams(fullParams);
  const form = new URLSearchParams({ ...fullParams, s });
  return form;
}

export async function createPayment({ commerceOrder, subject, amount, email, urlConfirmation, urlReturn }) {
  const form = buildSignedForm({
    commerceOrder,
    subject,
    currency: 'CLP',
    amount,
    email,
    urlConfirmation,
    urlReturn,
  });

  const res = await fetch(`${FLOW_BASE_URL}/payment/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error creando el pago en Flow');
  }
  return data; // { url, token, flowOrder }
}

export async function getStatus(token) {
  const fullParams = { apiKey: FLOW_API_KEY, token };
  const s = signParams(fullParams);
  const params = new URLSearchParams({ ...fullParams, s });

  const res = await fetch(`${FLOW_BASE_URL}/payment/getStatus?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error consultando el estado del pago en Flow');
  }
  return data;
}

// status: 1 pendiente, 2 pagada, 3 rechazada, 4 anulada
export const FLOW_STATUS_MAP = {
  1: 'INICIADA',
  2: 'AUTORIZADA',
  3: 'RECHAZADA',
  4: 'ANULADA',
};
