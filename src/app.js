const AlbumsPlugin = require("./albums");
const SongsPlugin = require("./songs");
const ClientError = require("./utils/ClientError");

async function registerApp(server) {
  await server.register([AlbumsPlugin, SongsPlugin]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (!(response instanceof Error)) return h.continue;

    if (response instanceof ClientError) {
      const res = h.response({ status: "fail", message: response.message });
      res.code(response.statusCode);
      return res;
    }

    if (!response.isServer) return h.continue;

    console.error(response);
    const res = h.response({
      status: "error",
      message: "Maaf, terjadi kegagalan pada server kami.",
    });
    res.code(500);
    return res;
  });
}

module.exports = registerApp;
