const routes = require("./routes");
const SongsService = require("./service");
const SongsHandler = require("./handler");

module.exports = {
  name: "songs",
  version: "1.0.0",
  register: async (server) => {
    const service = new SongsService();
    const handler = new SongsHandler(service);
    server.route(routes(handler));
  },
};
