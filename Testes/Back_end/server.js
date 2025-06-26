import express from 'express';
import router from './app.js';
import cors from 'cors';

const app = express();
const PORT = 3000; // 
app.use(cors()); // Libera todas as origens
app.use(express.json());
// Rotas
app.use('/api', router);
// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});


export default app;