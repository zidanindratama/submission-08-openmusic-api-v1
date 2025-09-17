const pool = require("../db/pool");
const { randomUUID } = require("crypto");
const NotFoundError = require("../utils/NotFoundError");

class SongsService {
  async addSong(payload) {
    const id = `song-${randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const { title, year, genre, performer, duration, albumId } = payload;

    const query = {
      text: `INSERT INTO songs(id, title, year, genre, performer, duration, album_id)
             VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      values: [
        id,
        title,
        year,
        genre,
        performer,
        duration ?? null,
        albumId ?? null,
      ],
    };
    const { rows } = await pool.query(query);
    return rows[0].id;
  }

  async getSongs({ title, performer }) {
    const clauses = [];
    const values = [];
    if (title) {
      values.push(`%${title}%`);
      clauses.push(`LOWER(title) LIKE LOWER($${values.length})`);
    }
    if (performer) {
      values.push(`%${performer}%`);
      clauses.push(`LOWER(performer) LIKE LOWER($${values.length})`);
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const { rows } = await pool.query(
      `SELECT id, title, performer FROM songs ${where} ORDER BY id ASC`,
      values
    );
    return rows;
  }

  async getSongById(id) {
    const { rows } = await pool.query(
      `SELECT id, title, year, performer, genre, duration, album_id AS "albumId"
       FROM songs WHERE id=$1`,
      [id]
    );
    if (!rows.length) throw new NotFoundError("Lagu tidak ditemukan");
    return rows[0];
  }

  async editSongById(id, payload) {
    const { title, year, genre, performer, duration, albumId } = payload;
    const { rowCount } = await pool.query(
      `UPDATE songs SET title=$1, year=$2, genre=$3, performer=$4, duration=$5, album_id=$6
       WHERE id=$7`,
      [title, year, genre, performer, duration ?? null, albumId ?? null, id]
    );
    if (!rowCount)
      throw new NotFoundError("Gagal memperbarui lagu. Id tidak ditemukan");
  }

  async deleteSongById(id) {
    const { rowCount } = await pool.query("DELETE FROM songs WHERE id=$1", [
      id,
    ]);
    if (!rowCount)
      throw new NotFoundError("Gagal menghapus lagu. Id tidak ditemukan");
  }
}

module.exports = SongsService;
