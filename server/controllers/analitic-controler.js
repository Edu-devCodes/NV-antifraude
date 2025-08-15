const fs = require('fs');
const { Network } = require('synaptic');



exports.loginAnalitic = (req, res) => {
    const dadosJson = req.body;
    console.log(dadosJson)
    // ler os dados e normalizar seus valores
    const dados = dadosJson.map(dado => ([
        dado.tentativas / 5,
        dado.hora / 23,
        dado.ipRepetido / 2
    ]));
    console.log(dados);

    // carregar o modelo salvo
    const modelo = JSON.parse(fs.readFileSync('ia/modelo.json', 'utf-8'));
    const rede = Network.fromJSON(modelo);

    // usando a rede
    const resultado = rede.activate(dados[0]);
    console.log("Resultado:", resultado);

    res.json(resultado);

}

exports.tranferAnalitic = (req, res) => {
    const dadosJsonTransfer = req.body;
    console.log(dadosJsonTransfer)
    // ler os dados e normalizar seus valores
    const dadosTransfer = dadosJsonTransfer.map(dado => ([
        dado.valor / 5000, // valor maximo experado 
        dado.hora / 23,
        dado.frequencia / 8, // 8 transações por hora já é meio suspeito
        dado.ip_Suspeito,
        dado.dispositivo_incomum
    ]));
    console.log(dadosTransfer);

    // carregar o modelo salvo
    const modeloTransfer = JSON.parse(fs.readFileSync('ia/modeloTransfer.json', 'utf-8'));
    const rede = Network.fromJSON(modeloTransfer);

    // usando a rede
    const resultado = rede.activate(dadosTransfer[0]);
    console.log("Resultado:", resultado);

    res.json(resultado);
}