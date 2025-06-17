import express from 'express';
import router from './app.js';
import cors from 'cors';

const app = express();
app.use(cors()); // Libera todas as origens
app.use(express.json());
app.use('/api', router);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
