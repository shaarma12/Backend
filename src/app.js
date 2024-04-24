import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// "use" is used for middleware 
// This configuration is used for tell the server that who all we allow to access the server by writing CORS_ORIGIN=* that means we allow all to use this server but actually that is not a good thing please avoid this.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

// express.json is used to allow and accept the json type format coming from request and we limit this upto 16kb to avoid server crash.

app.use(express.json({ limit: "16kb" }));

// "express.urlencode is used to allow and accept the type of request coming if we saw in the url that suppose it is Himanshu Sharma so it make it some time Himanshu + Sharma or sometime Himanshu$Sharma# like that so to tackle these type of response we use this."

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

// this is used for server can access the browser cookies and change it .
app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/user", userRoutes);

export { app };