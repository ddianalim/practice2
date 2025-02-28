const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');
const Resume = require('../models/Resume');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

// Update the path to .env file
dotenv.config({ path: path.join(__dirname, '../../backend/.env') });

// Add a check for MONGO_URI
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in .env file');
  process.exit(1);
}

async function testModels() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a test user
    const user = await User.create({
      email: 'test@example.com',
      password: 'testpassword123',
      name: 'Test User'
    });
    console.log('Created test user:', user);

    // Create a test job
    const job = await Job.create({
      title: 'Software Engineer',
      company: 'Test Company',
      description: 'A great job opportunity',
      requirements: ['JavaScript', 'Node.js', 'MongoDB'],
      location: 'Remote',
      type: 'Full-time'
    });
    console.log('Created test job:', job);

    // Create a test resume
    const resume = await Resume.create({
      userId: user._id,
      content: 'Test resume content with experience in JavaScript and Node.js'
    });
    console.log('Created test resume:', resume);

    // Create a test admin user
    const adminUser = await User.create({
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'admin'  // This makes them an admin
    });
    console.log('Created admin user:', adminUser);

    // Clean up (optional - comment out if you want to keep the test data)
    await User.deleteOne({ _id: user._id });
    await Job.deleteOne({ _id: job._id });
    await Resume.deleteOne({ _id: resume._id });
    console.log('Cleaned up test data');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testModels(); 