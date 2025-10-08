// Thay vì "import", dùng "require"
const js = require("@eslint/js");
const globals = require("globals");

// Thay vì "export default", dùng "module.exports"
module.exports = [
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...js.configs.recommended.rules,
    }
  },
];