import mongoose from "mongoose";
import { mongoConnection } from "../secrets.js";

const mongoInit = async (app) => {

    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoConnection);
        console.log("Connected to Mongo DB");
        app.listen(5001, () => console.log("Listening to port 5001"));
    } catch (error) {
        console.log(error);
    }
    
}

export default mongoInit;