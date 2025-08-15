const express = require('express');
const router = express.Router();
const ControlerAnalitic = require('../controllers/analitic-controler');
const IA = require('../controllers/treinarIA')


router.post('/analise-login', ControlerAnalitic.loginAnalitic);
router.post('/analise-transfer',ControlerAnalitic.tranferAnalitic);
router.get('/trainig_loginAI', IA.readingData)
router.get('/training_transferAI', IA.startingAI)



module.exports = router;