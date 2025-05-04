const express = require('express');
const { Signup, verifyOtp, Login } = require('../controllers/authController');
const router = express.Router();


router.post('/signup', Signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', Login);

module.exports = router;