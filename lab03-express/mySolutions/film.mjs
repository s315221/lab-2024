"use strict";

import dayjs from "dayjs";

export default function Film(film) {
    this.id = film.id;
    this.title = film.title;
    this.isFavorite = film.isFavorite;
    this.rating = film.rating;
    this.watchDate = film.watchDate;
    this.userId = film.userId;

    this.toJSON = () => {
        return { ...this };
    }

}