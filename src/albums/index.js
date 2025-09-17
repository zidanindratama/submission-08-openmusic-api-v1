const routes = require("./routes");
const AlbumsService = require("./service");
const AlbumsHandler = require("./handler");

module.exports = {
  name: "albums",
  version: "1.0.0",
  register: async (server) => {
    const service = new AlbumsService();
    const handler = new AlbumsHandler(service);
    server.route(routes(handler));
  },
};
