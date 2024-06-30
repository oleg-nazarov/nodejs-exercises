import express from "express";
import { Calculations } from "./Calcucations";

const app = express();

const { PORT = 3000 } = process.env;

app.get("/", (req, res) => {
    const calc = new Calculations({ name: "salary" });

    res.send({
        // @ts-ignore
        result: calc.getResult(),
        isValid: calc.isValid("test"),
        temperature_1: calc.getWeatherText('Boston', 74),
        temperature_2: calc.getWeatherText('NYC', 78),
        name: calc.name,
    });
});

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
