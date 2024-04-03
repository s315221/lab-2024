"use strict";

import sqlite3 from "sqlite3";
import dayjs from "dayjs";

const db = new sqlite3.Database(
    'films.db',
    (err) => {
        if (err) throw new Error("could not open database. Error: " + err)
    }
)

export default function Film(id, title, isFavorite = 0, rating = null, watchDate = null, userId = 1) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.rating = rating;
    this.watchDate = watchDate /*|| dayjs().format("YYYY-MM-DD")*/;
    this.userId = userId;

    this.toString = () =>
        `Id: ${this.id}, ` +
        `Title: ${this.title}, ` +
        `Favorite: ${this.isFavorite}, ` +
        `Rating: ${this.rating}, ` +
        `Watch Date: ${this.watchDate}, ` +
        `UserId: ${this.userId}`;
}

function FilmLibrary() {

    this.getFilms = () => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films; `,
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );

    this.getFavoriteFilms = () => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films
                    WHERE isFavorite = TRUE`,
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );

    this.getFilmsWatchedToday = () => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films
                    WHERE watchDate = ?`/*+ `OR watchDate IS NULL`*/,
                [dayjs("").format("YYYY-MM-DD")],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );

    this.getFilmsWatchedEarlierThan = (date) => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films
                    WHERE watchDate < ?`/*+ `OR watchDate IS NULL`*/,
                [dayjs(date).format("YYYY-MM-DD")],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );

    this.getFilmsWithScoresGreaterThanOrEqualTo = (score) => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films
                    WHERE rating >= ?`/*+ `OR watchDate IS NULL`*/,
                [score],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );

    this.getFilmsWithTitleContaining = (str) => new Promise(
        (resolve, reject) => {
            db.all(
                `SELECT id, title, isFavorite, rating, watchDate, userId FROM films
                WHERE title LIKE ? `/*+ `OR watchDate IS NULL`*/,
                ['%' + str + '%'],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows.map(row => new Film(row.id, row.title, row.isFavorite, row.rating, row.watchDate, row.userId)));
                }
            )
        }
    );











    this.addFilm = (film) => new Promise(
        (resolve, reject) => {
            db.run(
                `INSERT INTO films (title, isFavorite, rating, watchDate, userId) VALUES (?,?,?,?,?);`,
                [
                    film.title,
                    film.isFavorite || 0,
                    film.rating || null,
                    film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null,
                    film.userId,
                ],
                function (err) {
                    if (err) reject(err);
                    else {
                        film.id = this.lastID;
                        resolve(film);
                    }
                }
            )
        }
    );

    /**
     * 2 b. Delete a movie from the database (using its ID as a reference). 
     * After completion, print a confirmation/failure message.
     */
    this.deleteFilm = (id) => new Promise(
        (resolve, reject) => {
            db.run(
                `DELETE FROM films WHERE id = ?`,
                [id],
                (err) => {
                    if (err) reject('Insertion failed with err: ' + err);
                    else resolve('Film deleted successfully');
                }
            );
        }
    );
    /**
     * c. Delete the watch date of all films stored in the database.
     *  After completion, print a confirmation/failure message.
     */
    this.resetWatchDate = () => new Promise(
        (resolve, reject) => {
            db.run(
                `UPDATE films 
                SET watchDate=NULL;`,
                (err) => {
                    if (err) reject("Watch date reset failed: " + err);
                    else resolve("Watch date reset successfully");
                }
            );
        }
    );

    this.toString = async () => {
        const films = await this.getFilms();
        return films.map(film => film.toString());
    };

}


async function main() {
    const filmLibrary = new FilmLibrary();

    // 1 a.
    console.log("***Stored Films***");
    const films = await filmLibrary.getFilms();
    films.forEach(film => console.log(film.toString()));
    console.log("\n")

    // 1 b.
    console.log("***Favorite Films***");
    const favoriteFilms = await filmLibrary.getFavoriteFilms();
    favoriteFilms.forEach(favoriteFilm => console.log(favoriteFilm.toString()));
    console.log("\n")

    // 1 c.
    console.log("***Films watched today***");
    const filmsWatchedToday = await filmLibrary.getFilmsWatchedToday();
    filmsWatchedToday.forEach(filmWatchedToday => console.log(filmWatchedToday.toString()));
    console.log("\n")

    // 1 d.
    const earlierThanDate = dayjs().format("YYYY-MM-DD");
    console.log("***Films watched earlier than " + earlierThanDate + "***");
    const filmsWatchedEarlierThan = await filmLibrary.getFilmsWatchedEarlierThan(earlierThanDate);
    filmsWatchedEarlierThan.forEach(film => console.log(film.toString()));
    console.log("\n")

    // 1 e.
    const greaterThanOrEqualToScore = 4;
    console.log("***With scores greater than or equal to " + greaterThanOrEqualToScore + "***");
    const filmsWithScoreGreaterThan = await filmLibrary.getFilmsWithScoresGreaterThanOrEqualTo(greaterThanOrEqualToScore);
    filmsWithScoreGreaterThan.forEach(film => console.log(film.toString()));
    console.log("\n")

    // 1.f
    const containsString = "ulp";
    console.log("***With title containing string: " + containsString + "***");
    const filmsWithTitleThatContains = await filmLibrary.getFilmsWithTitleContaining(containsString);
    filmsWithTitleThatContains.forEach(film => console.log(film.toString()));
    console.log("\n");



    // 2.a.
    console.log(`\n****** Adding a new movie: ******`);
    let newFilm = new Film(undefined, "Fast & Furious", false, 2, dayjs().toISOString(), 2);
    let addedFilm = await filmLibrary.addFilm(newFilm);
    console.log(await filmLibrary.toString());

    console.log(`\n****** Adding a movie using default parameters: ******`);
    newFilm = new Film(undefined, "2 Fast 2 Furious");
    addedFilm = await filmLibrary.addFilm(newFilm);
    console.log(await filmLibrary.toString());


    // 2.b.
    const filmID = addedFilm.id;
    console.log(`\n****** Deleting the movie with ID '${filmID}': ******`);
    console.log(await filmLibrary.deleteFilm(filmID));
    console.log(await filmLibrary.toString());



    // 2.c.
    console.log(`\n****** Resetting all the watch dates: ******`);
    console.log(await filmLibrary.resetWatchDate());
    console.log(await filmLibrary.toString());





    return;
}





main();