import mongoose from "mongoose";

const dbConnct = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.DB_URL}/invoice`);
    console.log(
      `\n MongoDb connected !! DB HOST: ${connection.connection.host}`
    );
    // console.log(connection)
  } catch (error) {
    console.log("ERR:", error);
    process.exit(1);
  }
};
export default dbConnct;
