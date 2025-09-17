const pool = require("../db/pool");
const { randomUUID } = require("crypto");
const NotFoundError = require("../utils/NotFoundError");

class AlbumsService {
  async addAlbum({ name, year }) {
    const id = `album-${randomUUID().replace(/-/g, "").slice(0, 16)}`;
    const query = {
      text: "INSERT INTO albums(id, name, year) VALUES($1,$2,$3) RETURNING id",
      values: [id, name, year],
    };
    const { rows } = await pool.query(query);
    return rows[0].id;
  }

  async getAlbumById(id) {
    const { rows } = await pool.query(
      "SELECT id, name, year FROM albums WHERE id=$1",
      [id]
    );
    if (!rows.length) throw new NotFoundError("Album tidak ditemukan");
    return rows[0];
  }

  async editAlbumById(id, { name, year }) {
    const { rowCount } = await pool.query(
      "UPDATE albums SET name=$1, year=$2 WHERE id=$3",
      [name, year, id]
    );
    if (!rowCount)
      throw new NotFoundError("Gagal memperbarui album. Id tidak ditemukan");
  }

  async deleteAlbumById(id) {
    const { rowCount } = await pool.query("DELETE FROM albums WHERE id=$1", [
      id,
    ]);
    if (!rowCount)
      throw new NotFoundError("Gagal menghapus album. Id tidak ditemukan");
  }

  async getAlbumDetailWithSongs(id) {
    const album = await this.getAlbumById(id);
    const { rows: songs } = await pool.query(
      "SELECT id, title, performer FROM songs WHERE album_id = $1",
      [id]
    );
    return { ...album, songs };
  }
}

module.exports = AlbumsService;
