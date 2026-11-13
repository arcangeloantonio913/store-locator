// Storage dei dati dello store locator su Vercel KV (Upstash Redis) via REST.
// Nessuna dipendenza npm: usa fetch (Node 18+) con l'API REST di Upstash.
// Chiave singola con l'intero dataset {brands, stores} (una ventina di record).
// Finché il KV non è configurato, legge dal seed (il sito pubblico funziona;
// l'admin però non può salvare).

const seed = require("./seed");

const KEY = "timeless:locator";
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function seedClone() {
  return JSON.parse(JSON.stringify(seed));
}

async function kvCommand(cmd) {
  const r = await fetch(KV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error("KV " + r.status + " " + (await r.text()).slice(0, 200));
  const j = await r.json();
  return j.result;
}

const isConfigured = () => Boolean(KV_URL && KV_TOKEN);

async function readData() {
  if (!isConfigured()) return { ...seedClone(), _source: "seed" };
  const raw = await kvCommand(["GET", KEY]);
  if (!raw) return { ...seedClone(), _source: "seed-empty" };
  try {
    const d = typeof raw === "string" ? JSON.parse(raw) : raw;
    return {
      brands: Array.isArray(d.brands) ? d.brands : [],
      stores: Array.isArray(d.stores) ? d.stores : [],
    };
  } catch {
    return { ...seedClone(), _source: "seed-parsefail" };
  }
}

async function writeData(data) {
  if (!isConfigured())
    throw new Error(
      "Storage KV non configurato: crea un database KV su Vercel e collegalo al progetto store-locator.",
    );
  await kvCommand(["SET", KEY, JSON.stringify(data)]);
}

module.exports = { readData, writeData, isConfigured };
