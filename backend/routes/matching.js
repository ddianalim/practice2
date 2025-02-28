const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');
const { calculateJobMatch } = require('../utils/aiMatching');

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

    // Get embeddings and calculate scores
    const jobs = await Job.find();
    const matches = await Promise.all(jobs.map(async (job) => ({
      job,
      score: await calculateJobMatch(resume, job)
    })));

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    res.json({
      resume,
      matches
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
    const matches = await Promise.all(resumes.map(async (resume) => ({
      resume,
      score: await calculateJobMatch(resume, job)
    })));

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    res.json({
      job,
      matches
    });
  } catch (error) {
    res.status(500).json({ message: 'Error finding matches', error: error.message });
  }
});

module.exports = router; 