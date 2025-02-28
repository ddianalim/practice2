const axios = require('axios');

const API_URL = 'http://localhost:5001/api';
let authToken = '';
let adminToken = '';
let resumeId = '';
let jobId = '';

async function testMatching() {
  try {
    // 1. Login as regular user
    console.log('1. Logging in as regular user...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'testpassword123'
    });
    authToken = loginResponse.data.token;
    console.log('✅ Login successful');

    // 2. Create a resume
    console.log('\n2. Creating resume...');
    const resumeResponse = await axios.post(
      `${API_URL}/resumes`,
      {
        content: 'Senior software engineer with 5 years experience in React, Node.js, and cloud technologies. Led development of multiple enterprise applications.'
      },
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    resumeId = resumeResponse.data._id;
    console.log('✅ Resume created:', resumeId);

    // 3. Login as admin
    console.log('\n3. Logging in as admin...');
    const adminLoginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'admin@example.com',
      password: 'admin123'
    });
    adminToken = adminLoginResponse.data.token;
    console.log('✅ Admin login successful');

    // 4. Create a job
    console.log('\n4. Creating job...');
    const jobResponse = await axios.post(
      `${API_URL}/jobs`,
      {
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        description: 'Looking for an experienced React developer',
        requirements: ['React', 'JavaScript', 'Node.js'],
        location: 'Remote',
        type: 'Full-time'
      },
      {
        headers: { Authorization: `Bearer ${adminToken}` }
      }
    );
    jobId = jobResponse.data._id;
    console.log('✅ Job created:', jobId);

    // 5. Test resume-to-jobs matching
    console.log('\n5. Testing resume-to-jobs matching...');
    const matchesResponse = await axios.get(
      `${API_URL}/matching/resume/${resumeId}/jobs`,
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    console.log('✅ Matches found:', matchesResponse.data.matches.length);
    console.log('Top match score:', matchesResponse.data.matches[0].score);

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testMatching(); 