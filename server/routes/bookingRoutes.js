const express = require('express');
const {
  getBookings,
  addBooking,
  updateBooking,
  deleteBooking,
  getBookingsByCustomer
} = require('../controllers/bookingController.js');

const router = express.Router();

router.get("/", getBookings);
router.post("/", addBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);
router.get("/customer/:customerID", getBookingsByCustomer);

module.exports = router;
