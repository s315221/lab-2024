"use strict";

/**
 * 1.  Create a Film Library
 */

import dayjs from "dayjs"; // 2

function Film(id, title, isFavorite = false, date, rating, userId = 1) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.date = date;
    this.rating = rating;
    this.userId = userId;

    this.toString = () => `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.isFavorite}, Watch date: ${this.date}, Score: ${this.rating}, User: ${this.userId}`;

}

function FilmLibrary() {
    this.films = [];

    this.addNewFilm = (film) => this.films.push(film);

    // 2
    this.sortByDate = () => [...this.films].sort((a, b) =>
        !a.date ? 1 : // if first date null, then it is larger so +1
            !b.date ? -1 : // else if second date is null, then it is larger so -1
                dayjs(a.date).diff(dayjs(b.date))  // else return dayjs difference
    );

    // 2
    this.deleteFilm = (id) => this.films = this.films.filter(film => film.id != id);

    // 2
    this.resetWatchedFilms = () => this.films.forEach(film => film.date = null);

    // 2
    this.getRated = (rating) => this.films.filter(film => film.rating).sort((a, b) => b.score - a.score);


}


function main() {

    // Creating some film entries
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix");
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);

    let filmLibrary = new FilmLibrary();
    filmLibrary.addNewFilm(pulpFiction);
    filmLibrary.addNewFilm(grams21);
    filmLibrary.addNewFilm(starWars);
    filmLibrary.addNewFilm(matrix);
    filmLibrary.addNewFilm(shrek);

    //list films
    console.log("*****List of films*****")
    console.log(filmLibrary.films.map(film => film.toString()));


    console.log("\n\n\n\nSorted by date:\n", filmLibrary.sortByDate().map(film => film.toString()));

    console.log("\n\n\n\nDelete film id 3");
    filmLibrary.deleteFilm(3);
    console.log(filmLibrary.films.map(film => film.toString()));
    //filmLibrary.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));

    console.log("\n\n\n\nresetWatchFilms:\n");
    filmLibrary.resetWatchedFilms();
    console.log(filmLibrary.films.map(film => film.toString()));
    filmLibrary = new FilmLibrary();
    filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, "March 10, 2024", 5, 1));
    filmLibrary.addNewFilm(new Film(2, "21 Grams", true, "March 17, 2024", 4, 1));
    filmLibrary.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));
    filmLibrary.addNewFilm(new Film(4, "Matrix", false, null, 0, 1));
    filmLibrary.addNewFilm(new Film(5, "Shrek", false, "March 21, 2024", 3, 1));

    console.log("\n\n\n\nget rated:\n", filmLibrary.getRated().map(film => film.toString()));
}

main();