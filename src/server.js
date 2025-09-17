require("dotenv").config();
const Hapi = require("@hapi/hapi");
const registerApp = require("./app");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: { cors: { origin: ["*"] } },
  });

  await registerApp(server);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
