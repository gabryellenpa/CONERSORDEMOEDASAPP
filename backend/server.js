import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://gabryellenpaixao_db_user:12345@claragabryellen.qahbstu.mongodb.net/?appName=claragabryellen")
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));


const FavoritoSchema = new mongoose.Schema({
  moedaOrigem: String,
  moedaDestino: String,
  valor: Number,
  resultado: Number,
});

const Favorito = mongoose.model("Favorito", FavoritoSchema);


app.get("/favoritos", async (req, res) => {
  const favoritos = await Favorito.find();
  res.json(favoritos);
});

app.post("/favoritos", async (req, res) => {
  const novo = new Favorito(req.body);
  await novo.save();
  res.json(novo);
});

app.put("/favoritos/:id", async (req, res) => {
  const atualizado = await Favorito.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(atualizado);
});

app.delete("/favoritos/:id", async (req, res) => {
  await Favorito.findByIdAndDelete(req.params.id);
  res.json({ mensagem: "Favorito removido com sucesso" });
});

app.listen(3000, () => console.log(" Servidor rodando na porta 3000"));
