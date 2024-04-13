"use strict";

import Database, { Query } from "./db.mjs";
import Film from "./film.mjs";

export default function FilmLibrary() {
    const db = new Database("./films.db");

    this.getFilms = () => new Promise(
        (resolve, reject) => {
            db.selectAll("films")
                .then((rows) => resolve(rows.map(row => new Film(row))))
                .catch(e => reject(e));
        }
    );

    this.getFilmWithId = (id) => new Promise(
        (resolve, reject) => {
            db.selectOne("films", "id = ?", id)
                .then((row) => {
                    if (row) resolve(new Film(row))
                    else resolve(undefined);
                })
                .catch(e => reject(e));
        }
    );

}
