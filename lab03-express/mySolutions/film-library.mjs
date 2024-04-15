"use strict";

import Database from "./db.mjs";
import Film from "./film.mjs";

export default function FilmLibrary() {
    const db = new Database("./films.db", { trace: true });

    this.getFilms = () => new Promise(
        (resolve, reject) => {
            db.selectAll("films")
                .then((rows) => resolve(rows.map(row => new Film(row))))
                .catch(e => reject(e));
        }
    );

    this.getFilmWithId = (id) => new Promise(
        (resolve, reject) => {
            db.selectOne("films", "id=?", id)
                .then((row) => {
                    if (row) resolve(new Film(row))
                    else resolve(undefined);
                })
                .catch(e => reject(e));
        }
    );

    this.addFilm = (film) => new Promise(
        (resolve, reject) => {
            const newFilm = new Film(film);
            console.log("obtained new film:\n", newFilm);
            db.insert("films",
                "(title, isFavorite, watchDate, rating, userId)",
                "(?, ?, ?, ?, ?)",
                [
                    newFilm.title,
                    newFilm.isFavorite,
                    newFilm.watchDate,
                    newFilm.rating,
                    newFilm.userId
                ]
            ).then(lastId => {
                newFilm.id = lastId;
                resolve(newFilm);
            })
                .catch(e => reject(e))
        }
    );

    this.updateFilm = async (id, rawFilm) => {
        const film = new Film(rawFilm);
        const numUpdated = await db.update(
            "films",
            "title = ?, isFavorite = ?, watchDate = ?, rating = ?, userId = ?",
            "id = ?",
            [film.title, film.isFavorite, film.watchDate, film.rating, film.userId, id]
        );
        if (numUpdated) {
            film.id = id;
            return film;
        }
        return null;
    }
}
