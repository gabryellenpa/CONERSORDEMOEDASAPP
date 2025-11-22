const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect("mongodb+srv://gabryellenpaixao_db_user:12345@claragabryellen.qahbstu.mongodb.net/?appName=claragabryellen")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// Rotas
app.use("/auth", authRoutes);

app.listen(3001, () => console.log("Auth backend rodando na porta 3001"));
