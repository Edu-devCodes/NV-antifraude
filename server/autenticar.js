const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;  // mesma chave que o NV usára, obviamente vou trocar para algo melhor dps


function autenticarAplicacao(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ erro: "Token malformado ou ausente" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ erro: "Token Ausente" });
    }

    try {
        const payload = jwt.verify(token, SECRET);

        if (payload.app !== "nv-bank") {
            return res.status(403).json({ erro: "Aplicação não autorizada" });
        }

        // caso tudo certo

        next();
    } catch (err) {
        console.log("Erro na verificação do token:", err.message);
        return res.status(403).json({ erro: "Token invalido ou expirado" });
    }
};

module.exports = autenticarAplicacao;

// no futuro validar com o ip da nv-bank se eu ganhar um quando hospedar

// não tá autenticando mt bem o token e tá deixando isso passar