"use strict";

import Database, { Query } from "./db.mjs";
import Film from "./film.mjs";

export default function FilmLibrary() {
    const db = new Database("./films.db");

    this.films = () => new Promise(
        (resolve, reject) => {
            db.selectAll("films")
                .then((rows) => resolve(rows.map(row => new Film(row))))
                .catch(e => reject(e));
        }
    );

}
