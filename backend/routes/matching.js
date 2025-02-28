const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');

// Get job matches for a resume
router.get('/resume/:resumeId/jobs', auth, async (req, res) => {
  try {
    // Verify resume belongs to user
    const resume = await Resume.findOne({
      _id: req.params.resumeId,
      userId: req.user.userId
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // TODO: Implement AI matching logic here
    const jobs = await Job.find();
    
    // For now, return all jobs (we'll add scoring later)
    res.json({
      resume,
      matches: jobs.map(job => ({
        job,
        score: 0 // Placeholder for AI similarity score
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error finding matches', error: error.message });
  }
});

// Get candidate matches for a job (admin only)
router.get('/job/:jobId/candidates', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // TODO: Implement AI matching logic here
    const resumes = await Resume.find().populate('userId', 'name email');

    // For now, return all candidates (we'll add scoring later)
    res.json({
      job,
      matches: resumes.map(resume => ({
        resume,
        score: 0 // Placeholder for AI similarity score
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Error finding matches', error: error.message });
  }
});

module.exports = router; 