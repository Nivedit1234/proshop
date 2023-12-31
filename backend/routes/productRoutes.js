import express from 'express';
//import products from '../data/products.js';
import {
  getProducts,
  getProductsById,
} from '../controllers/productController.js';
//import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import mongoose from 'mongoose';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductsById);

//router.get(
//'/',

//asyncHandler(async (req, res) => {
//const products = await Product.find({}); // {} empty object will get all the products

// throw new Error('some Error');
//res.json(products);
// })
//);

//router.get(
//'/:id',
//getProductsById
//asyncHandler(async (req, res) => {
//const product = products.find((p) => p._id === req.params.id); // getting products from data/products file

//const id = req.params.id;
//console.log(id);
//console.log(req.params.id);

//    const product = await Product.findById(req.params.id);
//console.log(req.params.id);

//if (product) {
// return res.json(product);
//} else {
// res.status(404);
// throw new Error('Product Not Found');
// }
// })
//);

export default router;
