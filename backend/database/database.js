import mongoose from mongoose

const connectDB = () => {
    mongoose.set('strictQuery', false);
    mongoose
      .connect(config.MONGODB_URL, {
        serverSelectionTimeoutMS: 50000,
        socketTimeoutMS: 60000,
        connectTimeoutMS: 60000,
      })
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.log('Failed to connect to MongoDB', error);
      });
  };

export default connectDB;