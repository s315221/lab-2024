"use strict";

import express from "express";
import morgan from "morgan";

import FilmLibrary from "./film-library.mjs";

const filmLibrary = new FilmLibrary();
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get("/api/films/", (req, res) => {
    filmLibrary.films()
        .then(films => res.status(200).json(films))
        .catch(e => res.status(500).json(e.message));
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
}) 