// GET /api/data — payload pubblico per lo store locator (sito).
// Solo marchi attivi e punti vendita visibili e geolocalizzati.

const { readData } = require("../lib/store");

module.exports = async (req, res) => {
  try {
    const d = await readData();
    const brands = (d.brands || [])
      .filter((b) => b.active !== false)
      .sort((a, b) => (a.sort || 0) - (b.sort || 0));
    const stores = (d.stores || []).filter(
      (s) => s.status !== "inactive" && s.lat != null && s.lng != null,
    );
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=30, stale-while-revalidate=300",
    );
    res.status(200).json({ brands, stores });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
