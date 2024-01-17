import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Pre hook will help to perform some action before we save data in db

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    //if we are user data but dealing with the password so it will just move on by next
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this pertains to the user you are saving
  //here we are trading the plain text password received from req body with hasheed password created above before saving it in db
});

const User = mongoose.model('User', userSchema);

export default User;
