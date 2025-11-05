import express from 'express';
import cors from 'cors';
import router from './routes/routes.js'

const app = express();

// Habilitar CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

app.use(express.json());

app.use('/api/v1', router);

export default app;
