SQLite version 3.37.2 2022-01-06 13:25:41
Enter ".help" for usage hints.
sqlite> .dump
PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users
(
    id    integer not null
        constraint users_pk
            primary key autoincrement,
    email TEXT    not null
        constraint users_unique_email
            unique,
    name  TEXT    not null
, hash TEXT not null, salt TEXT not null);
INSERT INTO users VALUES(1,'john.doe@polito.it','John','e06a2f2073a3d66d1ca4fd6ce04c64fe684ea19c27660b05e2fbf7269ce9ff42','72e4eeb14def3b21');
INSERT INTO users VALUES(2,'mario.rossi@polito.it','Mario','ac28edf49ba34ac83c17145375a030b4579ffddf3fe1dbb68f530bb3ca4ce514','a8b618c717683608');
INSERT INTO users VALUES(3,'testuser@polito.it','Testuser','4af3cc8549ccc19af11b711cada4509c4e93c57cca34078c683498ed7bf64258','e818f0647b4e1fe0');
CREATE TABLE IF NOT EXISTS "films"
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
INSERT INTO films VALUES(1,'Pulp Fiction',1,5,'2024-03-10',1);
INSERT INTO films VALUES(2,'21 Grams',1,4,'2024-03-17',1);
INSERT INTO films VALUES(3,'Star Wars',0,NULL,NULL,1);
INSERT INTO films VALUES(4,'Matrix',0,NULL,NULL,2);
INSERT INTO films VALUES(5,'Shrek',0,3,'2024-03-21',2);
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('users',3);
INSERT INTO sqlite_sequence VALUES('films',5);
COMMIT;