"use strict";

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

    this.sortByDate = () => [...this.films].sort((a, b) =>
        !a.date ? 1 : // if first date null, then it is larger so +1
            !b.date ? -1 : // else if second date is null, then it is larger so -1
                dayjs(a.date).diff(dayjs(b.date))  // else return dayjs difference
    );

    this.deleteFilm = (id) => this.films = this.films.filter(film => film.id != id);

    this.resetWatchedFilms = () => this.films.forEach(film => film.date = null);

    this.getRated = (rating) => this.films.filter(film => film.rating).sort((a, b) => b.score - a.score);

    /*Exercise 2*/
    this.getFavorites = () => this.films.filter(film => film.isFavorite);

    this.getBestRated = () => this.films.filter(film => film.rating >= 5);

    this.getSeenAfter = (date) => this.films.filter(film => film.date && (dayjs(film.date).isSame(dayjs(date)) || dayjs(film.date).isAfter(dayjs(date))));

    this.getUnSeen = () => this.films.filter(film => !film.date)
}

/**Lab 05 **/

// Preparing film library
const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-04-10", 5);
const grams21 = new Film(2, "21 Grams", true, "2024-04-17", 4);
const starWars = new Film(3, "Star Wars", false);
const matrix = new Film(4, "Matrix", true);
const shrek = new Film(5, "Shrek", false, "2024-04-21", 3);
const shrek2 = new Film(52, "Shrek 2", false, "2024-04-01", 3);

let filmLibrary = new FilmLibrary();
filmLibrary.addNewFilm(pulpFiction);
filmLibrary.addNewFilm(grams21);
filmLibrary.addNewFilm(starWars);
filmLibrary.addNewFilm(matrix);
filmLibrary.addNewFilm(shrek);
filmLibrary.addNewFilm(shrek2);




/*Exercise 1*************************************************************************************************/

/**
 * @param {Film} film
 * @returns {string} film as html td element
 */
function filmToTableRow(film) {
    //console.log('populating ', film)
    const ratingToIcons = function (rating) {
        return [1, 2, 3, 4, 5]
            .map(i => `<i class="bi bi-star${rating >= i ? "-fill" : ''}"></i>`)
            .join('\n');
    }

    return `<tr id="film-id-${film.id}">
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
                    <i class="bi bi-trash" onClick="deleteHandler(${film.id})";></i>
                </td>
            </tr> `;
}


/**
 * @param {Film[]} filmArray 
 * @returns void
 * inserts films in filmLibrary as a table rows in film table
 */
function pagePopulateFilmTable(filmArray) {

    const filmListElement = document.getElementById("film-list");
    filmListElement.innerHTML = filmArray.map(
        film => filmToTableRow(film)
    ).join('\n');
}


pagePopulateFilmTable(filmLibrary.films);



/*Exercise 2*************************************************************************************************/


let activeFilterButton = document.getElementById("filter-all");

function pagePopulateFilteredFilmTable(filterButton) {
    const filmTableTitleString = filterButton.innerText;
    const filmArray = [];

    switch (filterButton.id) {
        case "filter-all":
            filmArray.push(...filmLibrary.films);
            break;
        case "filter-favorites":
            filmArray.push(...filmLibrary.getFavorites());
            break;
        case "filter-bestRated":
            filmArray.push(...filmLibrary.getBestRated());
            break;
        case "filter-seenLastMonth":
            filmArray.push(...filmLibrary.getSeenAfter(dayjs().subtract(1, 'month').startOf('month')));
            break;
        case "filter-unseen":
            filmArray.push(...filmLibrary.getUnSeen());
            break;
        default:
    }

    activeFilterButton.className = activeFilterButton.className.replace(" active", "");
    activeFilterButton = filterButton;
    activeFilterButton.className = activeFilterButton.className.concat(" active");

    document.getElementById("film-table-title").innerText = filmTableTitleString;

    pagePopulateFilmTable(filmArray);
}

/**
* @param {Event} event
*/
function filterHandler(event) {
    const clickedFilterButton = event.target;
    pagePopulateFilteredFilmTable(clickedFilterButton);
}

const filterButtonElements = document.getElementsByTagName("filter-button");
for (const filterButtonElement of filterButtonElements) {
    filterButtonElement.addEventListener('click', filterHandler);
}


/*Exercise 3**********************************************************************************************/

//add onClick="deleteHandler" in trash icon
function deleteHandler(filmId) {
    filmLibrary.deleteFilm(filmId);
    pagePopulateFilteredFilmTable(activeFilterButton);
}