"use strict";

import express from "express";
import morgan from "morgan";

import FilmLibrary from "./film-library.mjs";
import { param, validationResult } from "express-validator";

const filmLibrary = new FilmLibrary();
const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get("/api/films/", (req, res) => {
    filmLibrary.getFilms()
        .then(films => res.status(200).json(films))
        .catch(e => res.status(500).json(e.message));
})

app.get("/api/films/:id", param("id", "invalid id").exists().isInt(),
    (req, res) => {
        const results = validationResult(req).array();
        if (results.length) {
            return res.status(422).json(results.map(result => result.msg));
        }
        const id = parseInt(req.params.id);
        filmLibrary.getFilmWithId(id).
            then(
                film => film ?
                    res.status(200).json(film) :
                    res.status(404).json("film not found")
            )
            .catch(e => res.status(500).json(e.message));
    });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
}) 