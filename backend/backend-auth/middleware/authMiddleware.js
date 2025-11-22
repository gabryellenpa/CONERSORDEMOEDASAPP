const jwt = require("jsonwebtoken");
const JWT_SECRET = "sua_chave_super_secreta";

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "Token não enviado" });

  jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Token inválido" });

    req.user = decoded;
    next();
  });
};
