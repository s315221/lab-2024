# 1. API Design

Film object in JSON format:

    {
    "id":number,
     "title": string,
     "favorite" : boolean, 
     "watchDate":string, 
     "rating":number, 
     "userId": number 
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

| Description          | Method | URL                                | Request Body                             | Response (200 OK)     | Error                                                        |
| -------------------- | ------ | ---------------------------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------ |
| List all films       | GET    | /api/films/                        | None                                     | [film1, film2, ...]   | 500                                                          |
| Get film by id       | GET    | /api/films/:id/                    | None                                     | film with matching id | 404(film not found), 500                                     |
| Add new film         | POST   | /api/films/                        | film (with no id field)                  | created film          | 422(invalid input), 503(database error)                      |
| Update film values   | PUT    | /api/films/:id/                    | film (no id field, updated other fields) | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Update film rating   | PUT    | /api/films/:id/rating/:rating/     | None                                     | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Mark as favorite     | PUT    | /api/films/:id/favorite/:favorite/ | None                                     | updated film          | 404(film not found), 422(invalid input), 503(database error) |
| Delete existing film | DELETE | /api/films/:id/                    | None                                     | Deleted film          | 404(film not found), 503(database error)                     |
