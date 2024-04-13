"use strict";

import sqlite3 from "sqlite3";

export function Query() {

}

function Database(filename) {
    const db = new sqlite3.Database(filename ? filename : ":memory:", (err) => {
        if (err) throw err;
        console.log(`Database ${filename} opened!`);
    });

    this.getRawDb = () => db;

    this.selectAll = (table) => new Promise(
        (resolve, reject) => {
            db.all(`SELECT * FROM ${table}`,
                (err, rows) => {
                    if (err) reject(err);
                    else {
                        resolve(rows);
                    }
                })
        }
    );
};

export default Database;