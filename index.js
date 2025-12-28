import express from "express";
import cors from "cors";
import uploadRoutes from "./routes/upload.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("A&M Backend Running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

