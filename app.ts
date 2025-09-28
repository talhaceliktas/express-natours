import express from "express";

const app = express();

app.get("/", (req, res) => {
  //   res.status(200).send("Hello from the server side!");
  res
    .status(200)
    .json({ message: "Hello from the server side!", app: "Natours" });
});

app.post("/", (req, res) => {
  res.end("Your message has been arrived to us");
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
