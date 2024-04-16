"use strict";

import sqlite3 from "sqlite3";
sqlite3.verbose();



function Database(filename, options) {
    const db = new sqlite3.Database(filename ? filename : ":memory:", (err) => {
        if (err) throw err;
        console.log(`Database ${filename} opened!`);
    });
    if (options.trace) {
        db.on('trace', sql => console.log(sql));
    }

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

    this.selectOne = (table, where, values) => new Promise(
        (resolve, reject) => {
            db.get(`SELECT * FROM ${table} WHERE ${where}`,
                values,
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                })
        }
    );

    this.insert = (table, columns, values, placeHolderValues) => new Promise(
        (resolve, reject) => {
            db.run(`INSERT INTO ${table} ${columns} VALUES ${values}`,
                placeHolderValues,
                function (err) {
                    if (err) {
                        //console.log(err)
                        reject(err);
                    }
                    else {
                        resolve(this.lastID);
                    }
                })
        }
    );
    /**
     * Converts parameters to "UPDATE ${tableName} SET ${setClause} WHERE ${whereClause};".
     * Values in params array replace any placeholders (?) in setClause and whereClause.
     * @param {string} tableName 
     * @param {string} setClause 
     * @param {string} whereClause 
     * @param {any[]} params  
     * @returns on success, number of changes occurred else throws error
     * 
     */

    this.update = (tableName, setClause, whereClause, params) => new Promise(
        (resolve, reject) => {
            db.run(
                `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause};`,
                params,
                function (err) {
                    if (err) return reject(err);
                    else resolve(this.changes);
                }
            );
        }
    );
};

export default Database;