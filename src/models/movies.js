const db = require("../configs/db");
const models = {};

// Get Models All Data Movie
models.getAll = function ({ page, sort }) {
  return new Promise(function (resolve, reject) {
    if (sort === "tittle") {
      db.query(`SELECT * FROM movie ORDER BY title asc LIMIT 5 OFFSET (($1-1) * 5)`, [page])
        .then((data) => {
          resolve(data.rows);
        })
        .catch((err) => reject(err));
    } else if (sort === "date") {
      db.query(`SELECT * FROM movie ORDER BY release_date desc LIMIT 5 OFFSET (($1-1) * 5)`, [page])
        .then((data) => {
          resolve(data.rows);
        })
        .catch((err) => reject(err));
    } else {
      db.query(`SELECT * FROM movie ORDER BY id desc LIMIT 5 OFFSET (($1-1) * 5)`, [page])
        .then((data) => {
          resolve(data.rows);
        })
        .catch((err) => reject(err));
    }
  });
};

// Get Models A Data Movie
models.getData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM movie WHERE id = ${id}`)
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

// Create Models Data Movie
models.addData = function ({ title, description, release_date, directed_by, duration, casts, images, category, price }) {
  return new Promise(function (resolve, reject) {
    db.query(`INSERT INTO movie (title, description,release_date,directed_by,duration,casts,images,category, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`, [
      title,
      description,
      release_date,
      directed_by,
      duration,
      casts,
      images,
      category,
      price,
    ])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

// Update Models Data
models.updateData = function ({ id, title, description, release_date, directed_by, duration, casts, images, category, price }) {
  return new Promise(function (resolve, reject) {
    db.query(`UPDATE movie SET title=$1, description=$2, release_date=$3, directed_by=$4, duration=$5, casts=$6, images=$7, category=$8, price=$9, updated_at=now() WHERE id = ${id} returning *`, [
      title,
      description,
      release_date,
      directed_by,
      duration,
      casts,
      images,
      category,
      price,
    ])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

// Delete Models Data
models.deleteData = function ({ id }) {
  return new Promise(function (resolve, reject) {
    db.query(`DELETE FROM movie WHERE id=${id}`)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

// Search Movie
models.searchData = function ({ lowercase, page }) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM movie WHERE LOWER(title) LIKE '%${lowercase}%' ORDER BY release_date desc LIMIT 5 OFFSET (($1-1) * 5)`, [page])
      .then((data) => {
        resolve(data.rows);
      })
      .catch((err) => reject(err));
  });
};

module.exports = models;
