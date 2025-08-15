const fs = require('fs');
const synaptic = require('synaptic');
const { Layer, Network, Trainer } = synaptic;

exports.readingData = (req, res) => {
    fs.readFile('ia/treino.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
        }

        const dadosBrutos = JSON.parse(data);
        const dados = dadosBrutos.map(exemplo => ({
            input: Object.values(exemplo.input),
            output: Object.values(exemplo.output)
        }));

        generateAI(dados);
        res.send('Rede neural treinada (simulação).');
    });
};

async function generateAI(dados) {
    // criando as redes neurais🤖
    const inputLayer = new Layer(3)
    const hiddenLayer = new Layer(4);
    const outputLayer = new Layer(1);

    // conectando as camadas da rede neural
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // criando a rede neural
    const myNetwork = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });

    // treinando a rede neural
    const trainer = await new Trainer(myNetwork);
    trainer.train(dados, {
        rate: 0.1,
        iterations: 5000,
        error: 0.005,
        shuffle: true,
        log: 1000
    }
    );

    const resultado = myNetwork.activate([0.2, 0.95, 0]);
    console.log('Resultado da ativação:', resultado);
    // Ex: [0.9823] → próximo de 1 → fraude

    // 1. Converte a rede para JSON
    const modeloJSON = myNetwork.toJSON();

    // 2. Salva no arquivo
    fs.writeFileSync('ia/modelo.json', JSON.stringify(modeloJSON, null, 2));

    console.log('✅ Modelo salvo em ia/modelo.json');


}

// Rede Neural de transferencias
exports.startingAI = (req, res) => {
    fs.readFile('ia/transferTreino.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao ler o arquivo' });
        }

        const dadosBrutosT = JSON.parse(data);
        const dadosTrasfer = dadosBrutosT.map(exemplo => ({
            input: Object.values(exemplo.input),
            output: Object.values(exemplo.output)
        }));

        generateTransferAI(dadosTrasfer);
        res.send('Rede neural treinada (simulação).');
    });
};

async function generateTransferAI(dadosTrasfer) {
     // criando as redes neurais🤖
    const inputLayer = new Layer(5)
    const hiddenLayer = new Layer(6);
    const outputLayer = new Layer(1);

    // conectando as camadas da rede neural
    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    // criando a rede neural
    const myNetworkT = new Network({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });

    // treinando a rede neural
    const trainer = await new Trainer(myNetworkT);
    trainer.train(dadosTrasfer, {
        rate: 0.03,
        iterations: 5000,
        error: 0.005,
        shuffle: true,
        log: 1000
    }
    );

    const resultado = myNetworkT.activate([0.2, 0.95, 0]);
    console.log('Resultado da ativação de transferencia:', resultado);
    // Ex: [0.9823] → próximo de 1 → fraude

    // 1. Converte a rede para JSON
    const modeloJSON = myNetworkT.toJSON();

    // 2. Salva no arquivo
    fs.writeFileSync('ia/modeloTransfer.json', JSON.stringify(modeloJSON, null, 2));

    console.log('✅ Modelo salvo em ia/modeloTranser.json');

}