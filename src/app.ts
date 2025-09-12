import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import { MErrorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors()); // untuk cek request yang datang dari mana aja
app.use(express.json()); // ngeparsing data ke json
app.use(express.urlencoded({ extended: true }));



// app.use("/api/v1/auth", authRoutes);
// app.use(MErrorHandler);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});