import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://pizza:33675767@cluster0.e2g3l.mongodb.net/pizza').then(()=>console.log("DB Connected"));
}
