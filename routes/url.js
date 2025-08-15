const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics,handleGetDetails } = require('../controllers/url');
const router = express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/:shortId', handleGetDetails);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;

// hey whats up whats going onn all good whats you expression on these challenges , love talking to you , more to come and go keep learning.