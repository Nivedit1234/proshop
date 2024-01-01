import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
  // try {
  //   const conn = await mongoose.connect(process.env.MONGO_URI, {
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

export default connectDB;
