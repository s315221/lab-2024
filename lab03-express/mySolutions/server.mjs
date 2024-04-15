"use strict";

import express from "express";
import morgan from "morgan";

import FilmLibrary from "./film-library.mjs";
import { body, param, validationResult } from "express-validator";

const filmLibrary = new FilmLibrary();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get("/api/films/", (req, res) => {
    filmLibrary.getFilms()
        .then(films => res.status(200).json(films))
        .catch(e => res.status(500).json(e.message));
})

app.get(
    "/api/films/:id/",
    param("id", "invalid id").exists().isInt(),
    (req, res) => {
        const results = validationResult(req);
        if (!results.isEmpty()) {
            return res.status(422).json(results.array().map(result => result.msg));
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


app.post(
    "/api/films/",
    [
        body("title").isString().notEmpty(),
        body("isFavorite").optional().isBoolean(),
        body("watchDate").optional({ nullable: true }),
        body("rating").optional({ nullable: true }).isInt({ min: 1, max: 5 }),
        body("userId").optional().isInt(),
    ],
    (req, res) => {
        const newFilmValidation = validationResult(req);
        if (!newFilmValidation.isEmpty()) {
            return res.status(422).json(newFilmValidation.array());
        }
        filmLibrary.addFilm(req.body)
            .then(film => res.status(200).json(film))
            .catch(e => res.status(503).json(e.message));
    }
);

app.put(
    "/api/films/:id/",
    [
        param("id", "invalid id").exists().isInt(),
        body("title").isString().notEmpty(),
        body("isFavorite").optional().isBoolean(),
        body("watchDate").optional({ nullable: true }),
        body("rating").optional({ nullable: true }).isInt({ min: 1, max: 5 }),
        body("userId").optional().isInt(),
    ],
    (req, res) => {
        const fieldValidation = validationResult(req);
        if (!fieldValidation.isEmpty()) {
            return res.status(422).json(fieldValidation.array());
        }
        const id = parseInt(req.params.id);
        const rawFilm = req.body;
        filmLibrary.updateFilm(id, rawFilm)
            .then(film =>
                film ?
                    res.status(200).json(film)
                    :
                    res.status(404).json("Film not found")
            )
            .catch(e => res.status(503).json("Update Film: Database error"));
    }
);



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
}) 