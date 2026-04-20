import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Proxy is running");
});

app.post("/fetch", async (req, res) => {
  try {
    const { url, options } = req.body;

    const response = await fetch(url, options || {});
    const text = await response.text();

    res.send({
      ok: true,
      status: response.status,
      data: text,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      error: error.message,
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});
