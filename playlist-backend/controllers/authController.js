const nodemailer = require("nodemailer");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (req, res) => {
  const { email } = req.body;

  const otp = generateOTP();
  const otpExpiry = Date.now() + 10 * 60 * 1000; 

  let user = await User.findOne({ email });
  if (!user) user = new User({ email });

  user.otp = otp;
  user.otpExpiry = otpExpiry;
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  exports.registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
  
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ token, message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    }
  };

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  });

  res.json({ message: "OTP sent to email" });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ message: "Login successful", token });
};



const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, 'yourSecretKey', { expiresIn: '1h' });

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = { sendOTP, verifyOTP, registerUser , loginUser};
