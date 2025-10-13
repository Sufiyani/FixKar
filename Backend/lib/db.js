
// import mongoose from "mongoose";

// export const connectDB = (uri) =>
//   mongoose
//     .connect(uri)
//     .then((c) => {
//       console.log(`Connected with ${c.connection.name}`);
//     })
//     .catch((e) => console.log(e));


import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
