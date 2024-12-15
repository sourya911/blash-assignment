const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/authController");
const {registerUser, loginUser} =require("../controllers/authController")

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', error: err });
    }
  });

  
router.post("/auth/send-otp", sendOTP);
router.post("/auth/verify-otp", verifyOTP);
router.post('/auth/register', registerUser);
router.post("/auth/login", loginUser);

module.exports = router;
