import express from "express";
import { router } from "./routes/routes.js";
const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        "message": "Success"
    })
})
app.use("/api/v1", router)
app.listen(3000, ()=>{
    console.log("Server running on PORT 3000");
})