# 🍽️ MANA_RES_ORDER — Vite + Tailwind + Express + ESLint + CI/CD

Dự án fullstack quản lý đơn hàng (hoặc nhà hàng), sử dụng **Vite + TailwindCSS** cho frontend và **Express.js** cho backend.
Được cấu hình sẵn **ESLint** để lint code, và **CI/CD GitHub Actions** để tự động kiểm tra code khi push.

---

## 📂 Cấu trúc thư mục

```
MANA_RES_ORDER/
│
├── .github/
│   └── workflows/
│       └── main.yml         # CI/CD workflow (test lint khi push branch long, anh)
│
├── client/                  # Frontend: Vite + TailwindCSS
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── server/                  # Backend: Express.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── node_modules/
│   ├── .env
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   └── .gitignore
│
└── .gitignore               # Ignore root-level files
```

---

## ⚙️ Cài đặt

### Clone dự án

```bash
git clone https://github.com/your-username/MANA_RES_ORDER.git
cd MANA_RES_ORDER
```

### Cài đặt dependencies

```bash
cd client && npm install
cd ../server && npm install
```

---

## 🚀 Chạy dự án

### Chạy frontend (Vite)

```bash
cd client
npm run dev
```

> Mặc định: [http://localhost:5173](http://localhost:5173)

### Chạy backend (Express)

```bash
cd server
npm run dev
```

> Mặc định: [http://localhost:5000](http://localhost:5000)

---

## 🎨 Cấu hình Tailwind (trong client)

`client/tailwind.config.js`

```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
};
```

Thêm vào `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧹 Cấu hình ESLint (CommonJS)

`server/eslint.config.js`

```js
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
];
```

Chạy kiểm tra lint:

```bash
npm run lint
```

---

## 🤖 CI/CD (GitHub Actions)

`.github/workflows/main.yml`

```yaml
name: Run Tests on Long and Anh branches

on:
  push:
    branches:
      - long
      - anh

jobs:
  test-build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: server/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: ./server

      - name: Run linter tests
        run: npm test
        working-directory: ./server
```

---

## ✅ Test thủ công

Nếu muốn test thủ công mà không cần CI/CD:

```bash
cd server
npm run lint
npm test
```

---

## 📦 Triển khai



---

## 👨‍💻 Tác giả

**Lý Hoàng Long**
**Phan Viết Tuấn Anh**
🎓 Sinh viên Học viện Công nghệ Bưu chính Viễn thông
📍 TP. Thủ Đức, TP. Hồ Chí Minh


---

## 📜 Giấy phép

MIT License © 2025 Lý Hoàng Long
