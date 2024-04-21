import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Data } from "./constant.js";

dotenv.config({
    path:"./env"
})

connectDB().then(() => {
    app.on("error", (error) => {
        console.log("Error", error);
        throw error;
    });
app.listen(process.env.PORT || 8000,() => {
    try {
        console.log(`Server is listen on Port:- ${process.env.PORT}`)
    } catch (error) {
        console.log("App is not listen to any PORT", error);
    }
})
    app.get('/', (req,res) => {
        res.send("It is the data regarding TOP Tier-1 Colleges in Delhi and their Locations!!!");
    })
    app.get("/v1/api/Tier-1_College/Delhi", (req, res) => {
        res.json(Data)
    })
})