# 1. API Design

Film object in JSON format:

    {
    "id":number, // unique, mandatory
     "title": string, // mandatory 
     "favorite" : boolean, // optional, default FALSE
     "watchDate":string, // optional, default NULL
     "rating":number, // optional, range(1,5), default NULL
     "userId": number // mandatory, default 1
    }

Example film object in JSON format:

    {
    "id":1,
     "title": "Pulp Fiction",
     "favorite" : true, 
     "watchDate": "2023-03-11", 
     "rating":5, 
     "userId": 1 
    }

films table columns:

    (
        id         integer           not null
            constraint films_pk
                primary key autoincrement,
        title      TEXT,
        isFavorite INTEGER default 0 not null,
        rating     INTEGER,
        watchDate  TEXT,
        userId     INTEGER           not null
            constraint films_user_id_fk
                references users
                on update cascade on delete cascade,
        constraint check_is_favorite
            check (isFavorite IN (0, 1)),
        constraint check_rating
            check (rating BETWEEN 1 AND 5)
    );


| Description          | Method | URL                      | Request Body                             | Response (200 OK)     | Error                                                        |
| -------------------- | ------ | ------------------------ | ---------------------------------------- | --------------------- | ------------------------------------------------------------ |
| List all films       | GET    | /api/films/              | None                                     | [film1, film2, ...]   | 500                                                          |
| Get film by id       | GET    | /api/films/:id/          | None                                     | film with matching id | 404(film not found), 500                                     |
| Add new film         | POST   | /api/films/              | film (with no id field)                  | created film          | 422(invalid input), 503(database error)                      |
| Update film values   | PUT    | /api/films/:id/          | film (no id field, updated other fields) | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Update film rating   | PUT    | /api/films/:id/rating/   | {"rating": number}                       | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Mark as favorite     | PUT    | /api/films/:id/favorite/ | {"isFavorite" : boolean}                 | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Delete existing film | DELETE | /api/films/:id/          | None                                     | Deleted films count   | 404(film not found), 503(database error)                     |
