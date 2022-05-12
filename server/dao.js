const sqlite = require('sqlite3');
const { Film } = require('./Film');

const db = new sqlite.Database('films_1.db', err = {
    if (err) { throw err; }
})

// GET: All films
exports.listFilms = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const films = rows.map(row => 
                new Film(
                    row.id,
                    row.title,
                    row.favorite,
                    row.watchdate,
                    row.rating,
                    row.user
                )
            );
            resolve(films);
        });
    });
}

// GET: Film by ID
exports.getFilmById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM films WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            const film = new Film(
                row.id,
                row.title,
                row.favorite,
                row.watchdate,
                row.rating,
                row.user
            );
            resolve(film);
        });
    });
} 

// POST: Create a film
exports.addFilm = (film) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO films(title, favorite, watchdate, rating, user) VALUES(" + 
        "?,?,?,?,?";
        db.run(sql,[
            film.id,
            film.title,
            film.isFavorite,
            film.watchDate,
            film.rating,
            film.user
        ], function(err) {
            if (err || this.changes === 0) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
}

// PUT: Update a film
exports.updateFilm = (newFilm) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE films SET " +
        "title = ?, " +
        "favorite = ?, " +
        "watchdate = ?, " +
        "rating = ?, " +
        "user = ?" + 
        "WHERE id = ?;";
        db.run(sql, [
            newFilm.title,
            newFilm.isFavorite,
            newFilm.watchDate,
            newFilm.rating,
            newFilm.user,
            newFilm.id
        ], function(err) {
            if (err) {
                reject(err);
                return;
            }
            if (this.changes === 0) {
                reject('404');
                return;
            }
            resolve(newFilm.id);
        });
    });
}