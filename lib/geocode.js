// Indirizzo -> coordinate via OpenStreetMap Nominatim (gratis, nessuna chiave).
// Nominatim chiede uno User-Agent identificativo e un uso leggero (~1 req/s):
// adatto agli inserimenti sporadici dell'owner.

async function geocodeAddress(q) {
  const query = (q || "").trim();
  if (query.length < 4) return null;
  try {
    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=it&q=" +
      encodeURIComponent(query);
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "TimelessStoreLocator/1.0 (store-locator; info@omniamarketing.studio)",
        "Accept-Language": "it",
      },
    });
    if (!r.ok) return null;
    const arr = await r.json();
    if (!Array.isArray(arr) || arr.length === 0) return null;
    const lat = Number(arr[0].lat);
    const lng = Number(arr[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

module.exports = { geocodeAddress };
