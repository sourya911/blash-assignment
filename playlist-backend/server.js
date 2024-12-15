const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video'); 

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


const User = require('./models/User');

async function getUserVideos(userId) {
  try {
    const user = await User.findById(userId).populate('videos');
    
    if (!user) {
      return { message: 'User not found' };
    }

    return user;
  } catch (err) {
    console.error(err);
    return { message: 'Error fetching user data' };
  }
}

getUserVideos('675daff94933070aa91faf0b').then(user => console.log(user));

app.use('/api', authRoutes);  
app.use('/api', videoRoutes);  

app.listen(5000, () => console.log('Server running on port 5000'));
