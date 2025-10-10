const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
// Danh sách các địa chỉ (origin) được phép truy cập
const allowedOrigins = [
  'http://localhost:5173',
  'http://res-order-bucket.s3-website-ap-southeast-1.amazonaws.com'
  // Sau này nếu có tên miền riêng, bạn thêm vào đây
];

app.use(cors({
  origin: function (origin, callback) {
    // Nếu request không có origin (ví dụ: dùng Postman, hoặc server-to-server) thì cho phép
    if (!origin) return callback(null, true);
    
    // Nếu origin của request có trong danh sách allowedOrigins thì cho phép
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      // Nếu không có trong danh sách, từ chối request
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));
//const { seedMenu } = require('./seed/menuSeed');
//seedMenu();
// Route cơ bản
console.log("hello1")
app.get('/', (req, res) => {
  res.send('Backend is running');
  
});


// Route cho menu
const menuRoutes = require('./routes/menu');
const bookingRoutes = require('./routes/bookingRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');

app.use('/api/menu', menuRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));