// Dataset iniziale dello store locator Timeless Luxury (4 marchi + 24 punti
// vendita), importato dalla versione statica. Usato come fallback finché il KV
// non contiene dati, e come base del primo salvataggio dall'admin.

const brands = [
  { id: "aquaforte", name: "Aquaforte", logo: "/assets/logo-aquaforte.png", active: true, sort: 1 },
  { id: "milor", name: "Milor Jewels", logo: "/assets/logo-milor.png", active: true, sort: 2 },
  { id: "burroni", name: "Giacomo Burroni", logo: "/assets/logo-burroni.png", active: true, sort: 3 },
  { id: "garmin", name: "Garmin", logo: "/assets/logo-garmin.png", active: true, sort: 4 },
];

const stores = [
  { id: "s1",  name: "Alfano Gioielleria",          address: "Via Mater Dolorosa 1, 90146 Palermo",            lat: 38.1648, lng: 13.3308, city: "Palermo",   province: "PA", cap: "90146", phone: "", status: "active", brands: ["Aquaforte", "Milor Jewels", "Giacomo Burroni"] },
  { id: "s2",  name: "Sutera Gioiellerie dal 1902", address: "Via Enrico Parisi 29, 90133 Palermo",            lat: 38.1278, lng: 13.3533, city: "Palermo",   province: "PA", cap: "90133", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s3",  name: "Santoro Gioielli",            address: "Corso Calatafimi 494/496, 90129 Palermo",        lat: 38.1065, lng: 13.3330, city: "Palermo",   province: "PA", cap: "90129", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s4",  name: "Gioielleria Gagliano",        address: "Corso Finocchiaro Aprile 95, 90138 Palermo",     lat: 38.1189, lng: 13.3468, city: "Palermo",   province: "PA", cap: "90138", phone: "", status: "active", brands: ["Garmin", "Aquaforte", "Giacomo Burroni"] },
  { id: "s5",  name: "Gioielleria Gagliano",        address: "Piazza Castelnuovo 9, 90100 Palermo",            lat: 38.1245, lng: 13.3536, city: "Palermo",   province: "PA", cap: "90100", phone: "", status: "active", brands: ["Garmin", "Aquaforte", "Giacomo Burroni"] },
  { id: "s6",  name: "Gioielleria Scaduto",         address: "Corso Umberto I 67, 90011 Bagheria (PA)",        lat: 38.0776, lng: 13.5082, city: "Bagheria",  province: "PA", cap: "90011", phone: "", status: "active", brands: ["Aquaforte", "Garmin", "Milor Jewels", "Giacomo Burroni"] },
  { id: "s7",  name: "Mediterranea Gioielli",       address: "Corso Ruggero, 90015 Cefalù (PA)",               lat: 38.0386, lng: 14.0228, city: "Cefalù",    province: "PA", cap: "90015", phone: "", status: "active", brands: ["Aquaforte", "Milor Jewels", "Giacomo Burroni"] },
  { id: "s8",  name: "Gioielleria D'Amico",         address: "Viale Europa 188, 90039 Villabate (PA)",         lat: 38.0773, lng: 13.4444, city: "Villabate", province: "PA", cap: "90039", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s9",  name: "Magi Gioielli",               address: "Via Ruggero Settimo 45/47, 90139 Palermo",       lat: 38.1232, lng: 13.3567, city: "Palermo",   province: "PA", cap: "90139", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s10", name: "Passalacqua Gioielleria",     address: "Piazza Duomo 30, 90049 Terrasini (PA)",          lat: 38.1462, lng: 13.0827, city: "Terrasini", province: "PA", cap: "90049", phone: "", status: "active", brands: ["Aquaforte", "Garmin"] },
  { id: "s11", name: "Russo Gioielleria",           address: "Via XI Maggio 144, 91025 Marsala (TP)",          lat: 37.7981, lng: 12.4336, city: "Marsala",   province: "TP", cap: "91025", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s12", name: "Lattuca Gioielli",            address: "Via Atenea 98/100, 92100 Agrigento",             lat: 37.3111, lng: 13.5765, city: "Agrigento", province: "AG", cap: "92100", phone: "", status: "active", brands: ["Aquaforte", "Garmin"] },
  { id: "s13", name: "Pluchino Gioielleria",        address: "Via Roma 112, 97100 Ragusa",                     lat: 36.9282, lng: 14.7255, city: "Ragusa",    province: "RG", cap: "97100", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s14", name: "Gioielleria Leonardo Meli",   address: "Via della Resistenza 34, Comiso (RG)",           lat: 36.9455, lng: 14.6031, city: "Comiso",    province: "RG", cap: "",      phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s15", name: "Salfo Gioielleria",           address: "Via Cavour 317, Vittoria (RG)",                  lat: 36.9501, lng: 14.5348, city: "Vittoria",  province: "RG", cap: "",      phone: "", status: "active", brands: ["Aquaforte", "Giacomo Burroni"] },
  { id: "s16", name: "Le Joye",                     address: "Via Sacro Cuore 32, 97015 Modica (RG)",          lat: 36.8588, lng: 14.7608, city: "Modica",    province: "RG", cap: "97015", phone: "", status: "active", brands: ["Aquaforte", "Giacomo Burroni", "Milor Jewels"] },
  { id: "s17", name: "Spina Gioielli",              address: "Via Vitt. Emanuele Orlando 6, 95126 Catania",    lat: 37.5126, lng: 15.0883, city: "Catania",   province: "CT", cap: "95126", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s18", name: "F.lli Maceli",                address: "Via dei Mille 61/63, 98123 Messina",             lat: 38.1884, lng: 15.5535, city: "Messina",   province: "ME", cap: "98123", phone: "", status: "active", brands: ["Aquaforte", "Giacomo Burroni"] },
  { id: "s19", name: "Branca Gioielli",             address: "Via Roma 140, 98051 Barcellona P.G. (ME)",       lat: 38.1472, lng: 15.2135, city: "Barcellona Pozzo di Gotto", province: "ME", cap: "98051", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s20", name: "Perdichizzi Gioiellerie",     address: "Via Medici 6, Milazzo (ME)",                     lat: 38.2185, lng: 15.2405, city: "Milazzo",   province: "ME", cap: "",      phone: "", status: "active", brands: ["Garmin"] },
  { id: "s21", name: "Befumo Gioielleria",          address: "Piazza Matteotti 19, 98071 Capo D'Orlando",      lat: 38.1633, lng: 14.7431, city: "Capo d'Orlando", province: "ME", cap: "98071", phone: "", status: "active", brands: ["Aquaforte"] },
  { id: "s22", name: "Faugiana Gioielleria",        address: "Via del Legno 183, Trapani",                     lat: 38.0176, lng: 12.5161, city: "Trapani",   province: "TP", cap: "",      phone: "", status: "active", brands: ["Garmin", "Giacomo Burroni"] },
  { id: "s23", name: "Centonze Gioiellieri",        address: "Corso Giovanni Amendola 11, 91025 Marsala (TP)", lat: 37.7985, lng: 12.4330, city: "Marsala",   province: "TP", cap: "91025", phone: "", status: "active", brands: ["Milor Jewels"] },
  { id: "s24", name: "Silver Key Gioielli",         address: "Via Roma 199, 91025 Marsala (TP)",               lat: 37.7990, lng: 12.4340, city: "Marsala",   province: "TP", cap: "91025", phone: "", status: "active", brands: ["Milor Jewels"] },
];

module.exports = { brands, stores };
