import mongoose from "mongoose";
const connection = async () => {
  await mongoose
    // "mongodb+srv://patidaranshu490:JcD7K1fmkF5WjEUd@cluster0.gdg4j.mongodb.net/ECommerce"
    .connect(process.env.DBURL)
    .then(() => console.log("Connected Succesfully..."))
    .catch((err) => console.log("Connection Failed...", err));
};
export default connection;
