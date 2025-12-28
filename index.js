import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("A&M Backend Running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
