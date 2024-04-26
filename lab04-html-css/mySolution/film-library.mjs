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

    /**
     * 
     * @param {number} id Film id
     * @param {{}} newValues Object with [key,value]=[columnName, newValue] 
     * @returns updated film from database
     */
    this.updateFilmWithId = async (id, newValues) => new Promise(
        (resolve, reject) => {
            const tableName = "films";
            const setClause = Object.keys(newValues).map(key => `${key}=?`).join(",");
            const params = Object.values(newValues);
            const whereClause = "id=?";
            db.update(tableName, setClause, whereClause, [...params, id])
                .then(numUpdated =>
                    numUpdated ?
                        this.getFilmWithId(id).
                            then(film => resolve(film))
                        :
                        resolve(null)
                )
                .catch(e => reject(e));
        }
    );

    this.deleteFilmWithId = (id) => new Promise(
        (resolve, reject) => {
            const tableName = "films";
            const whereClause = "id=?";
            const param = id;
            db.delete(tableName, whereClause, param)
                .then(numDeleted => resolve(numDeleted))
                .catch(e => reject(e));
        }
    );
}
