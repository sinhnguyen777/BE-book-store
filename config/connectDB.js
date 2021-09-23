import mongoose from 'mongoose';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = () =>{
  mongoose.Promise = bluebird;
  const url = `mongodb+srv://${process.env.USER_NAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.haxcj.mongodb.net/${process.env.DATABASE_NAME_MONGODB}?retryWrites=true&w=majority`
  mongoose.connect(process.env.DATABASE_LOCAL?? url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false 
});
}
export default connectDB;