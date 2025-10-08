import js from "@eslint/js";
import globals from "globals";
// "defineConfig" không còn cần thiết trong các phiên bản mới, nhưng để lại cũng không sao
// import { defineConfig } from "eslint/config";

export default [ // Bỏ defineConfig đi cho gọn
  {
    files: ["**/*.{js,mjs,cjs}"],
    // extends: ["js/recommended"] không còn cần thiết khi đã có js.configs.recommended
    languageOptions: {
      ecmaVersion: "latest", // Nên thêm dòng này
      sourceType: "commonjs", // Thêm dòng này nếu bạn dùng require/module.exports
      globals: {
        ...globals.browser, // Giữ lại môi trường trình duyệt
        ...globals.node     // <-- Thêm dòng này để ESLint hiểu các biến của Node.js
      }
    },
    // Thay extends bằng cách này cho chuẩn flat config
    rules: {
      ...js.configs.recommended.rules,
      // Bạn có thể thêm hoặc ghi đè các rule khác ở đây
    }
  },
];