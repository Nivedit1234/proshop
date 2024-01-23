import path from 'path';
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { payPalFunc } from './controllers/orderController.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB(); //Connect to DB

const port = process.env.PORT || 5000;

const app = express();

//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Cookie Parser middleware
//To parse the cookie from the req object
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.json(products);
});

// app.get('/api/config/paypal', (req, res) => {
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
// });

app.use('/api/config/paypal', payPalFunc);

// app.get('/:id', (req, res) => {
//   const product = products.find((p) => p._id === req.params.id);

//   res.json(product);
// });

const __dirname = path.resolve(); //Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// if (process.env.NODE_ENV === 'production') {
//   const __dirname = path.resolve();
//   //app.use('/uploads', express.static('/var/data/uploads'));
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// } else {
//   const __dirname = path.resolve();
//   //app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
//   //if you are not in production we are running rect dev server
//   app.get('/', (req, res) => {
//     res.send('API is running....');
//   });
// }

app.use(errorHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
