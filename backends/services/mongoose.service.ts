import mongoose from "mongoose";

class MongooseService {
  constructor() {
    mongoose.set("strictQuery", false);
    console.log("connecting to : " + process.env.MONGO_URL!);
    mongoose.connect(process.env.MONGO_URL!, () => {
      console.log("database connected");
    });
  }
}
const mongooseService = new MongooseService();
export default mongooseService;
