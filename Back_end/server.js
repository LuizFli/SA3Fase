import express from 'express';
import router from './app.js';
import cors from 'cors';
import initializeDatabase from './initDatabase.js';

const app = express();
const PORT = 3000; // 

app.use(cors()); // Libera todas as origens
app.use(express.json());

// Rotas
app.use('/api', router);

// Inicializar banco de dados e depois iniciar o servidor
const startServer = async () => {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`Backend rodando em http://localhost:${PORT}`);
  });
};

startServer();

