import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
//import { errorHandler } from '../middleware/errorHandler.js';

//@desc Get all Products
//@route GET /api/products
//@access Public

const getProducts = asyncHandler(async (req, res) => {
  //const pageSize = 8; //decides how many products to bring from db
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword }); //gives how many total products are there in db

  const products = await Product.find({ ...keyword }) // {} empty object will get all the products
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, count, pages: Math.ceil(count / pageSize) });

  //res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// This code is for implementing pagination in a Node.js application, specifically for retrieving a list of products from a database. Let's break down the key components:

// const pageSize = 4;: This variable defines the number of products to be fetched per page. In this case, it's set to 4, meaning each page will display up to 4 products.

// const page = Number(req.query.pageNumber) || 1;: This line extracts the page number from the request query parameters (req.query.pageNumber). If the page number is not provided or is not a valid number, it defaults to 1.

// const count = await Product.countDocuments();: This line calculates the total number of products in the database using the countDocuments method. The total count is crucial for determining the number of pages needed for pagination.

// const products = await Product.find({}) .limit(pageSize) .skip(pageSize * (page - 1));: This is the main query to fetch products from the database. It uses the find method to get all products, limits the result to pageSize products, and skips the appropriate number of products based on the current page.

// res.json({ products, page, count, pages: Math.ceil(count / pageSize) });: Finally, the server responds with a JSON object containing the fetched products (products), the current page (page), the total count of products (count), and the total number of pages (pages). The Math.ceil(count / pageSize) is used to calculate the total number of pages needed, rounding up to ensure all products are covered.

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

//Product Not Found will not be coming as message
// In section **3 - Custom Error Middleware** we throw an error from our
// `getProductById` controller function, with a _custom_ message.
// However if we have a invalid **ObjectId** as `req.params.id` and use that to
// query our products in the database, Mongoose will throw an error before we
// reach the line of code where we throw our own error.

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
