// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import color from 'colors';
// import users from './data/users.js';
// import products from './data/product.js';
// import User from './backend/models/userModel.js';
// import Product from './backend/models/productModel.js';
// import Order from './backend/models/orderModel.js';
// import connectDB from './backend/config/db.js';

// dotenv.config();

// connectDB();

// // seeder.js is completely separate from rest of the application will run it from cmd line

// const importData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany(); //before importing any product or user we delete them
//     await User.deleteMany(); // if you dont pass anything in deleteMany func it will delete everything

//     const createdUsers = await User.insertMany(users); //return array of users

//     const adminUser = createdUsers[0]._id; //getting the adming users from createUsers

//     //SampleProduct holds all the products to be pushed into the db
//     //also we are adding user field to all the product in addition so thats why spread operator
//     const sampleProducts = products.map((product) => {
//       return { ...product, user: adminUser };
//     });

//     await Products.insertMany(sampleProducts);

//     console.log('Data Imported'.green.inverse);
//     process.exit();
//   } catch (error) {
//     console.log(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// const destroyData = async () => {
//   try {
//     await User.deleteMany();
//     await Product.deleteMany();
//     await Order.deleteMany();
//   } catch (error) {
//     console.log(`${error}`.red.inverse);
//     process.exit(1);
//   }
// };

// if (process.argv[2] === '-d') {
//   destroyData();
// } else {
//   importData();
// }

// //console.log(process.argv[2]);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
//import connectDB from './config/db.js';

dotenv.config();

const connectDB = async () => {
  // try {
  //   const url = process.env.MONGO_URI;
  //   const conn = await mongoose.connect(url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   });
  //   console.log(`MongoDB connected: ${conn.connection.host}`);
  // } catch (error) {
  //   console.log(`Error:${error.message}`);
  //   process.exit(1);
  // }
  mongoose
    .connect(
      'mongodb+srv://niveditindras95:app%40%23%24123@cluster0.tqvou3z.mongodb.net/proshop',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //mongoose.set('strictQuery', false);
      }
    )
    .then(() => {
      //console.log(`MongoDB connected: ${conn.connection.host}`);

      console.log('Connected Successfully');
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

//s};

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    //const adminUser = createdUsers[0]._id;
    const adminUser = createdUsers.find((user) => {
      return user.isAdmin === true; //getting the adminUser
    });
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
