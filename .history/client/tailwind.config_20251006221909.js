/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Quét tất cả file trong thư mục src
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          200: '#d7b38c',  // Thêm màu nâu tùy chỉnh cho bg-brown-200
        },
      },
    },
  },
  plugins: [],
}