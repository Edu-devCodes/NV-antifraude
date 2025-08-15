require('dotenv').config(); 
const express = require("express");
const cors = require("cors")
const app = express();

// rotas
const AnaliseNV = require('./routes/analise');
autenticar = require('./autenticar');

// Middlewares
app.use(cors());
app.use(express.json()); // permite JSON no corpo da requisição
app.use(autenticar);




app.use('/', AnaliseNV)





app.listen(5000, () =>{
    console.log("Servidor rodando na porta 5000");
});