import express, { Request } from "express";
import fs from "fs/promises";
import path from "path";

const { PORT = 3000 } = process.env;

const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.get("/", async (req, res) => {
//     // res.status(418).setHeader("Content-Type", "text/plain");

//     const indexPath = path.join(__dirname, "public", "index.html");
//     const file = await fs.readFile(indexPath);

//     res.setHeader("Content-Type", "text/html");
//     res.send(file);
// });

// app.get("/style.css", async (req, res) => {
//     const stylePath = path.join(__dirname, "public", "style.css");
//     const file = await fs.readFile(stylePath);

//     res.setHeader("Content-Type", "text/css");
//     res.send(file);
// });

app.post("/", (req, res) => {
    console.log(req.headers["content-type"], req.body);
    res.send({ good: true });
});

app.post("/info", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    console.log(req.headers["content-type"], req.body);
    res.send({ good: true });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
