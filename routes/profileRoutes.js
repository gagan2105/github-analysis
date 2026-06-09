const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Analyze and save a profile from GitHub API
router.post('/analyze/:username', profileController.analyzeAndSaveProfile);

// Get all saved profiles
router.get('/', profileController.getAllProfiles);

// Get a single saved profile by username
router.get('/:username', profileController.getProfileByUsername);

module.exports = router;
