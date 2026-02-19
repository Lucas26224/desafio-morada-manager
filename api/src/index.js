const express = require('express');
const cors = require('cors');
const CapelaController = require('./controllers/controller');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.get('/capelas', CapelaController.index);          // Listar
app.post('/capelas', CapelaController.create);        // Criar
app.delete('/capelas/:id', CapelaController.delete);  // Deletar (precisa do ID)
app.put('/capelas/:id', CapelaController.updateStatus); // Atualizar (precisa do ID)

app.listen(3333, () => console.log('API Rodando na porta 3333'));