// POST /api/admin — gestione dati protetta da password (owner Timeless).
// Azioni:
//   { action:'load' }                      -> dataset completo (anche inattivi)
//   { action:'save', brands:[], stores:[] } -> geocodifica i mancanti e persiste
// Auth: header 'x-admin-password' o body.password == process.env.ADMIN_PASSWORD.

const { readData, writeData, isConfigured } = require("../lib/store");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (!process.env.ADMIN_PASSWORD) {
    res.status(500).json({
      error:
        "ADMIN_PASSWORD non configurata sul progetto. Impostala nelle Environment Variables di Vercel.",
    });
    return;
  }

  const body = typeof req.body === "object" && req.body ? req.body : {};
  const pw = req.headers["x-admin-password"] || body.password;
  if (pw !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Password errata." });
    return;
  }

  try {
    if (body.action === "load") {
      const d = await readData();
      res.status(200).json({
        brands: d.brands || [],
        stores: d.stores || [],
        storageReady: isConfigured(),
      });
      return;
    }

    if (body.action === "save") {
      if (!isConfigured()) {
        res.status(400).json({
          error:
            "Storage KV non collegato: crea un database KV su Vercel e collega il progetto, poi riprova.",
        });
        return;
      }
      const brands = Array.isArray(body.brands) ? body.brands : [];
      const stores = Array.isArray(body.stores) ? body.stores : [];

      // La geocodifica avviene lato browser (admin.html, rete dell'owner).
      // Qui normalizziamo solo le coordinate a numero o null e persistiamo.
      for (const s of stores) {
        const lat = Number(s.lat);
        const lng = Number(s.lng);
        s.lat = s.lat === "" || s.lat == null || !Number.isFinite(lat) ? null : lat;
        s.lng = s.lng === "" || s.lng == null || !Number.isFinite(lng) ? null : lng;
      }

      await writeData({ brands, stores });
      res.status(200).json({ ok: true, brands, stores });
      return;
    }

    res.status(400).json({ error: "Azione non valida." });
  } catch (e) {
    res.status(500).json({ error: String((e && e.message) || e) });
  }
};
