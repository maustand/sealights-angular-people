import express from "express";
import cors from "cors";

import { swaggerInit } from "./swagger.js";
import { addPerson, getPersons } from "./lib/persons.js";
import {
  addCity,
  getCitiesByCountryId,
  getCountries,
} from "./lib/countries.js";
import logger from "./logger.js";
import figlet from "figlet";

const app = express();
const port = 3000;
const jsonMiddleware = express.json();

app.use(cors());
swaggerInit(app);

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<h1>Demo Server - Good Luck :)</h1>`);
});

app.get("/api/persons", (req, res) => {
  try {
    const data = getPersons();
    res.status(200).json(data);
  } catch (error) {
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: `failed to get persons with error: ${error.message} ` });
  }
});

app.post("/api/persons", jsonMiddleware, (req, res) => {
  try {
    const newPerson = addPerson(req.body);
    res.status(200).json(newPerson);
  } catch (error) {
    res.status(500).json({
      error: `failed to create a person with error: ${error.message}`,
    });
  }
});

app.get("/api/cities/:countryId", (req, res) => {
  try {
    const cities = getCitiesByCountryId(+req.params.countryId);
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/cities", jsonMiddleware, (req, res) => {
  try {
    const city = addCity(req.body);
    res.status(200).json(city);
  } catch (error) {
    res
      .status(500)
      .json({ error: `failed to add a city with error: ${error.message}` });
  }
});

app.get("/api/countries", (req, res) => {
  try {
    const data = getCountries();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: `failed to get countries with error: ${error.message} ` });
  }
});

app.listen(port, () => {
  const title = figlet.textSync("Demo Server", {
    font: "Standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: false,
  });
  logger.log(title, "\n\n");
  logger.info(`Listening to port ${port} \n`);
});
