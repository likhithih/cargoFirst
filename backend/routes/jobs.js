const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all jobs for the user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new job
router.post('/', auth, async (req, res) => {
  const { title, description, lastDate, company } = req.body;

  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ 
        message: 'User ID not found in token',
        err: { message: 'Missing user ID in request' }
      });
    }

    const job = new Job({
      title,
      description,
      lastDate,
      company,
      postedBy: req.user.id
    });

    await job.save();
    res.json(job);
  } catch (err) {
    console.error('Job creation error:', err);
    res.status(500).json({ 
      message: 'Server error', 
      err: err 
    });
  }
});

// Update a job
router.put('/:id', auth, async (req, res) => {
  const { title, description, lastDate, company } = req.body;

  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    job = await Job.findByIdAndUpdate(req.params.id, { title, description, lastDate, company }, { new: true });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndRemove(req.params.id);
    res.json({ message: 'Job removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
