module.exports = (handler) => [
  {
    method: "POST",
    path: "/albums",
    handler: (r, h) => handler.postAlbumHandler(r, h),
  },
  {
    method: "GET",
    path: "/albums/{id}",
    handler: (r, h) => handler.getAlbumByIdHandler(r, h),
  },
  {
    method: "PUT",
    path: "/albums/{id}",
    handler: (r, h) => handler.putAlbumByIdHandler(r, h),
  },
  {
    method: "DELETE",
    path: "/albums/{id}",
    handler: (r, h) => handler.deleteAlbumByIdHandler(r, h),
  },
];
