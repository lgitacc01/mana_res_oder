const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://res-order-bucket.s3-website-ap-southeast-1.amazonaws.com',
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