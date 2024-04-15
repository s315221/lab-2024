"use strict";

import dayjs from "dayjs";

export default function Film(film) {
    this.id = film.id;
    this.title = film.title;
    this.isFavorite = film.isFavorite ? 1 : 0;
    this.rating = film.rating || null;
    this.watchDate = film.watchDate ? dayjs(film.watchDate).format("YYYY-MM-DD") : null;
    this.userId = film.userId || 1;

    /*this.toJSON = () => {
        return {
            ...this,
            isFavorite: this.isFavorite ? true : false,
        };
    }*/
}