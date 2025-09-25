import { SerialPort, ReadlineParser } from "serialport";
import { MongoClient } from "mongodb";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// --------------------
// Configura porta serial
// --------------------
const port = new SerialPort({ path: "/dev/ttyUSB0", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// --------------------
// Configura MongoDB Atlas
// --------------------
const uri =
  "mongodb+srv://paulotober14:Qy9sKH6O5qR5FPWl@esp32.dc1gba3.mongodb.net/?retryWrites=true&w=majority&appName=ESP32";

const client = new MongoClient(uri);

// --------------------
// Configura servidor Express
// --------------------
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos estáticos (HTML, CSS e JS)
app.use(express.static(path.join(__dirname, "public")));

// Rota principal - servir o arquivo HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

let collection;

async function run() {
  try {
    await client.connect();
    console.log("✅ Conectado ao MongoDB Atlas");

    // Nome do banco e coleção
    const db = client.db("esp32_data");
    collection = db.collection("leituras");

    // --------------------
    // Escuta dados da serial e salva no MongoDB
    // --------------------
    parser.on("data", async (data) => {
      try {
        const obj = JSON.parse(data); // JSON vindo do ESP32
        console.log(`🌡️ Temp: ${obj.temp}°C | 💧 Umid: ${obj.umid}%`);

        // Adiciona timestamp
        const doc = { ...obj, timestamp: new Date() };
        await collection.insertOne(doc);
      } catch (err) {
        console.log("Recebido cru (não JSON válido):", data);
      }
    });
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB Atlas:", err);
  }
}

run();

// --------------------
// Rota para buscar dados do MongoDB
// --------------------
app.get("/api/leituras", async (req, res) => {
  try {
    const docs = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).send("Erro ao buscar dados");
  }
});

// --------------------
// Inicia servidor
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌍 Servidor rodando em http://localhost:${PORT}`);
});