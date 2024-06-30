import * as http from 'http';
import * as fs from 'fs';

const { PORT = 3000 } = process.env;

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.setHeader('Content-Type', 'application/json');

        res.write(`{ text: "hey" }`);

        res.end();
    }

    if (req.method === "POST") {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        const uniqueFileName = 'uploadedFile_' + Date.now() + '.jpg';
        const writableStream = fs.createWriteStream(uniqueFileName);

        req.on("data", (chunk) => {
            writableStream.write(chunk);
        });
        req.on("end", () => {
            writableStream.end();
            res.end();
        })
    }

    res.end();
});
server.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`);
});