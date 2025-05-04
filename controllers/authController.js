const User = require('../models/User');
const sendOtp = require('../utils/sendOtp');
const jwt = require('jsonwebtoken');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const Signup = async(req, res) => {
    const { name, email } =req.body;
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 Minutes

    let user = await User.findOne({ email });

    if(!user) {
        user = new User({ name, email, otp, otpExpiry });
    } else {
        user.otp = otp;
        user.otpExpiry = otpExpiry;
    }

    await user.save();
    await sendOtp(name, email, otp);

    res.json({ message: 'OTP sent to your email'});
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if(!user || user.otp !== otp || user.otpExpiry < new Date()) {
        return res.status(400).json({
            message: 'Invalid or Expired OTP'
        });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET_KEY,
    {
        expiresIn: '1d'
    }
 );

 res.json({
    token,
    user: {
        name: user.name,
        email: user.email
    }
 });
};

const Login = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email, isVerified: true });

    if(!user) return res.status(401).json({ message: 'Email not registered or not verified'});

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d'});
    res.json({message: "Login Successfull", token, user: { email: user.email, name: user.name }});
};


module.exports  = { Signup, verifyOtp, Login };