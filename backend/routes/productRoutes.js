import express from 'express';
//import products from '../data/products.js';
import productRoutes from '../middleware/asyncHandler.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({}); // {} empty object will get all the products

    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    //const product = products.find((p) => p._id === req.params.id); // getting products from data/products file

    //const id = req.params.id;
    //console.log(id);
    //console.log(req.params.id);

    const product = await Product.findById(req.params.id);
    //console.log(req.params.id);

    res.json(product);
  })
);

export default router;
