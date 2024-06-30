import fs from "fs";
import path from "path";

const sourceDestination = path.join(__dirname, 'files_in', 'img_origin.jpg');
const outputDestination = path.join(__dirname, 'files_out', 'img_1.jpg');

const readStream = fs.createReadStream(sourceDestination);
const writeStream = fs.createWriteStream(outputDestination);

readStream.pipe(writeStream);
