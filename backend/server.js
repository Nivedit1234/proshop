import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

dotenv.config();
connectDB(); //Connect to DB

const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json(products);
});

// app.get('/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);

//   res.json(product);
// });

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
