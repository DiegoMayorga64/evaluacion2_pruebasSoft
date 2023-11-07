import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User mongo schema
 * - name (string): User's name
 * - email (string): User's email
 * - password (string): User's password
 * - isAdmin (boolean): If the user is an admin
 * - createdAt (ISODate): Date when the user data is created
 * - updatedAt (ISODate): Last date when the user data is updated
 */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      select: false,
    },
  },
  { timestamps: true },
);

/**
 * Pre save user
 * Generate HASH password if password is modified
 */
userSchema.pre('save', async function (next) {
  const user = this;

  // hash the password if it has been modified (or new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate the hash
  const salt = await bcrypt.genSaltSync();
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
  return next();
});

/**
 * Compare the input password with the current hashed password
 * @param {string} candidatePassword - Cantidate password to check
 * @returns {boolean} true if the passwords are the same
 */
async function comparePassword(candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
}

userSchema.methods = {
  comparePassword,
};

export default userSchema;
