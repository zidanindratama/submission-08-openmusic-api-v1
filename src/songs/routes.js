module.exports = (handler) => [
  {
    method: "POST",
    path: "/songs",
    handler: (r, h) => handler.postSongHandler(r, h),
  },
  {
    method: "GET",
    path: "/songs",
    handler: (r, h) => handler.getSongsHandler(r, h),
  },
  {
    method: "GET",
    path: "/songs/{id}",
    handler: (r, h) => handler.getSongByIdHandler(r, h),
  },
  {
    method: "PUT",
    path: "/songs/{id}",
    handler: (r, h) => handler.putSongByIdHandler(r, h),
  },
  {
    method: "DELETE",
    path: "/songs/{id}",
    handler: (r, h) => handler.deleteSongByIdHandler(r, h),
  },
];
