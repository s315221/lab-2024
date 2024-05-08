"use strict";

/**
 * 1.  Create a Film Library
 */

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


function mainConsole() {

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


/**Lab 05 **/



/*Exercise 1*/

/**
 * @param {Film} film
 * @returns {string} film as html td element
 */
function filmToTableRow(film) {

    const ratingToIcons = function (rating) {
        return [1, 2, 3, 4, 5]
            .map(i => `<i class="bi bi-star${rating >= i ? "-fill" : ''}"></i>`)
            .join('\n');
    }

    return `<tr>
                <td>${film.title}</td>
                <td>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" ${film.isFavorite ? "checked" : ''}>
                        <label class="form-check-label">
                            Favorite
                        </label>
                    </div>
                </td>
                <td>${film.date ? dayjs(film.date).format('MMMM DD, YYYY') : ''}</td>
                <td>
                ${ratingToIcons(film.rating)}
                </td>
                <td>
                    <i class="bi bi-pencil"></i>
                    <i class="bi bi-trash"></i>
                </td>
            </tr> `;
}


/**
 * @param {FilmLibrary} filmLibrary 
 * @returns void
 * inserts films in filmLibrary as a table rows in film table
 */
function pagePopulateFilmTable(filmLibrary) {

    const filmListElement = document.getElementById("film-list");
    filmListElement.innerHTML = filmLibrary.films.map(
        film => filmToTableRow(film)
    ).join('\n');
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

    pagePopulateFilmTable(filmLibrary);


}

main();
