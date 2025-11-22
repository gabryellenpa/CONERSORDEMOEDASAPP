const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "sua_chave_super_secreta";

// CADASTRO
router.post("/register", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ message: "Email já cadastrado" });

    const hash = await bcrypt.hash(senha, 10);

    const novoUser = new User({ nome, email, senha: hash });
    await novoUser.save();

    res.json({ message: "Usuário criado com sucesso" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) return res.status(400).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login realizado", token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
