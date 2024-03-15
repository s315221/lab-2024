"use strict";

function Film(id, title, isFavorite = false, date, rating, userId = 1) {
    this.id = id;
    this.title = title;
    this.isFavorite = isFavorite;
    this.date = date;
    this.rating = (rating < 0) ? 0 : ((rating > 5) ? 5 : rating);
    this.userId = userId;
}

function FilmLibrary() {
    this.films = [];

    this.addNewFilm = (film) => this.films.push(film);
}

const filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(new Film(1, "Pulp Fiction", true, "March 10, 2024", 5, 1));
filmLibrary.addNewFilm(new Film(2, "21 Grams", true, "March 17, 2024", 4, 1));
filmLibrary.addNewFilm(new Film(3, "Star Wars", false, null, 0, 1));
filmLibrary.addNewFilm(new Film(4, "Matrix", false, null, 0, 1));
filmLibrary.addNewFilm(new Film(5, "Shrek", false, "March 21, 2024", 3, 1));

console.log(filmLibrary);