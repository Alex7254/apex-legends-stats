const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:platform/:gamertag', async (req, res) => {
  try {
    // Headers for API request to stat tracker
    const headers = {
      'TRN-Api-Key': process.env.TRACKER_API_KEY
    };

    const { platform, gamertag } = req.params;

    // Request to stat tracker website API for stats
    const response = await fetch(
      `${process.env.TRACKER_API_URL}/profile/${platform}/${gamertag}`,
      { headers }
    );

    // Response from request to stat tracker
    const data = await response.json();

    if (data.errors && data.errors.length > 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Give recieved data as response
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
