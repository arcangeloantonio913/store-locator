// Geocodifica server-side (rete di sicurezza). Usa Photon (OSM, komoot): a
// differenza di Nominatim NON blocca gli IP cloud/serverless di Vercel.
// La geocodifica PRIMARIA avviene lato browser dall'admin (rete dell'owner),
// quindi qui arriviamo solo se il client non è riuscito a posizionare.

async function geocodeAddress(q) {
  const query = (q || "").trim();
  if (query.length < 4) return null;
  try {
    const url =
      "https://photon.komoot.io/api/?limit=1&lang=it&lat=37.6&lon=14&q=" +
      encodeURIComponent(query);
    const r = await fetch(url, {
      headers: {
        "User-Agent":
          "TimelessStoreLocator/1.0 (store-locator; info@omniamarketing.studio)",
      },
    });
    if (!r.ok) return null;
    const j = await r.json();
    const f = j && Array.isArray(j.features) ? j.features[0] : null;
    if (!f || !f.geometry || !Array.isArray(f.geometry.coordinates)) return null;
    const [lng, lat] = f.geometry.coordinates; // GeoJSON: [lon, lat]
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

module.exports = { geocodeAddress };
