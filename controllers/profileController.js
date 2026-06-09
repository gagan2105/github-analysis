const axios = require('axios');
const db = require('../config/db');

// @route   POST /api/profiles/analyze/:username
// @desc    Fetch from GitHub API and save to MySQL
exports.analyzeAndSaveProfile = async (req, res) => {
    const { username } = req.params;

    try {
        // Fetch data from GitHub API
        const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
        const data = githubResponse.data;

        const profileData = {
            username: data.login,
            name: data.name || '',
            avatar_url: data.avatar_url || '',
            bio: data.bio || '',
            public_repos: data.public_repos || 0,
            followers: data.followers || 0,
            following: data.following || 0,
            location: data.location || '',
            github_url: data.html_url || '',
        };

        // Check if profile exists
        const [existing] = await db.query('SELECT id FROM profiles WHERE username = ?', [profileData.username]);

        if (existing.length > 0) {
            // Update
            await db.query(`
                UPDATE profiles 
                SET name=?, avatar_url=?, bio=?, public_repos=?, followers=?, following=?, location=?, github_url=?, updated_at=CURRENT_TIMESTAMP
                WHERE username=?
            `, [
                profileData.name, profileData.avatar_url, profileData.bio, 
                profileData.public_repos, profileData.followers, profileData.following, 
                profileData.location, profileData.github_url, profileData.username
            ]);
            return res.status(200).json({ message: 'Profile updated successfully', data: profileData });
        } else {
            // Insert
            await db.query(`
                INSERT INTO profiles (username, name, avatar_url, bio, public_repos, followers, following, location, github_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
                profileData.username, profileData.name, profileData.avatar_url, profileData.bio, 
                profileData.public_repos, profileData.followers, profileData.following, 
                profileData.location, profileData.github_url
            ]);
            return res.status(201).json({ message: 'Profile analyzed and saved successfully', data: profileData });
        }
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 404) {
            return res.status(404).json({ message: 'GitHub user not found' });
        }
        res.status(500).json({ message: 'Server Error' });
    }
};

// @route   GET /api/profiles
// @desc    Get all saved profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const [profiles] = await db.query('SELECT * FROM profiles ORDER BY created_at DESC');
        res.status(200).json({ data: profiles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @route   GET /api/profiles/:username
// @desc    Get a single profile by username
exports.getProfileByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const [profiles] = await db.query('SELECT * FROM profiles WHERE username = ?', [username]);

        if (profiles.length === 0) {
            return res.status(404).json({ message: 'Profile not found in database' });
        }

        res.status(200).json({ data: profiles[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
