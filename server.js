import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"

express.static('uploads')

// app config
const app=express()
const port =4000

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// middleware
app.use(express.json())
app.use(cors())



//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,async()=>{
    // db connection
    await connectDB();
    console.log(`Server Started on http://localhost:${port}`);
})

