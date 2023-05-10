import { Schema, model, models, Document, Model } from 'mongoose';

interface IUser {
    email: string;
    username: string;
    image?: string;
}
  
type UserModel = Model<IUser & Document>;

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User: UserModel = models.User || model("User", UserSchema);

export default User;