// Storage dei dati dello store locator su Vercel Blob (un singolo JSON pubblico).
// Chiave unica `locator/data.json` con l'intero dataset {brands, stores}.
// Finché il Blob non è configurato (manca il token), legge dal seed: così il
// sito pubblico funziona comunque; l'admin però non può salvare.

const { put, list } = require("@vercel/blob");
const seed = require("./seed");

const PATHNAME = "locator/data.json";

function seedClone() {
  return JSON.parse(JSON.stringify(seed));
}

const isConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

async function readData() {
  if (!isConfigured()) return { ...seedClone(), _source: "seed" };
  try {
    const { blobs } = await list({ prefix: PATHNAME, limit: 1 });
    if (!blobs || !blobs.length) return { ...seedClone(), _source: "seed-empty" };
    const r = await fetch(blobs[0].url, { cache: "no-store" });
    if (!r.ok) throw new Error("blob fetch " + r.status);
    const d = await r.json();
    return {
      brands: Array.isArray(d.brands) ? d.brands : [],
      stores: Array.isArray(d.stores) ? d.stores : [],
    };
  } catch {
    return { ...seedClone(), _source: "seed-fallback" };
  }
}

async function writeData(data) {
  if (!isConfigured())
    throw new Error(
      "Storage Blob non configurato: manca BLOB_READ_WRITE_TOKEN sul progetto.",
    );
  await put(PATHNAME, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

module.exports = { readData, writeData, isConfigured };
