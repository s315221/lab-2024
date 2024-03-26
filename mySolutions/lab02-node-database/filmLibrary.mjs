"use strict";

import sqlite3 from "sqlite3";
import dayjs from "dayjs";

const db = new sqlite3.Database(
    'films.db',
    (err) => {
        if (err) throw new Error("could not open database. Error: " + err)
    }
)

function Film(id, title, isFavorite, rating, watchDate, userId) {
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
    console.log("\n")

}

main();