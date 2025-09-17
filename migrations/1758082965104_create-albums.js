exports.up = (pgm) => {
  pgm.createTable("albums", {
    id: { type: "varchar(50)", primaryKey: true },
    name: { type: "text", notNull: true },
    year: { type: "integer", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("albums");
};
