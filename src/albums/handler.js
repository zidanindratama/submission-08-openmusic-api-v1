const { AlbumPayloadSchema } = require("./validator");
const InvariantError = require("../utils/InvariantError");

class AlbumsHandler {
  constructor(service) {
    this._service = service;
  }

  async postAlbumHandler(request, h) {
    const { error } = AlbumPayloadSchema.validate(request.payload);
    if (error) throw new InvariantError(error.message);

    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: "success",
      data: { albumId },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this._service.getAlbumById(id);
    return { status: "success", data: { album } };
  }

  async putAlbumByIdHandler(request) {
    const { error } = AlbumPayloadSchema.validate(request.payload);
    if (error) throw new InvariantError(error.message);

    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    return { status: "success", message: "Album berhasil diperbarui" };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return { status: "success", message: "Album berhasil dihapus" };
  }
}

module.exports = AlbumsHandler;
