const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');
const { auth } = require('../middleware/auth');
const { getEmbedding } = require('../utils/aiMatching');

// Get user's resumes
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user.userId });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resumes', error: error.message });
  }
});

// Upload resume
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const embedding = await getEmbedding(content);
    const resume = await Resume.create({
      userId: req.user.userId,
      content,
      embedding
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resume', error: error.message });
  }
});

// Get single resume
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id,
      userId: req.user.userId 
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume', error: error.message });
  }
});

// Update resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { content: req.body.content },
      { new: true }
    );
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error updating resume', error: error.message });
  }
});

// Delete resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ 
      _id: req.params.id,
      userId: req.user.userId 
    });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resume', error: error.message });
  }
});

module.exports = router; 