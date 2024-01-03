import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import { errorHandler } from '../middleware/errorHandler.js';

//@desc Get all Products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // {} empty object will get all the products
  res.json(products);
});

//@desc Get specific Products
//@route GET /api/products/:id
//@access Public

const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product Not Found');
  }
});

export { getProducts, getProductsById };
