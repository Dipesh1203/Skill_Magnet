import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password?: string;
  isGoogleUser: boolean;
  googleId?: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: function (this: IUser) {
      return !this.isGoogleUser;
    },
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
