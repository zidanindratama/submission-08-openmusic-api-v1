module.exports = {
  env: {
    node: true, // ✅ kasih tahu kalau pakai Node.js
    es2022: true, // ✅ aktifkan fitur ES terbaru
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "no-console": "off",
    eqeqeq: ["error", "always"],
  },
};
