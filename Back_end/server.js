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

// import express from 'express';
// import router from './routes.js'; // Alterei de app.js para routes.js
// import cors from 'cors';

// const app = express();
// const PORT = 3000;

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json());
// app.use('/api', router);

// app.listen(PORT, () => {
//   console.log(`Backend rodando em http://localhost:${PORT}`);
// });
