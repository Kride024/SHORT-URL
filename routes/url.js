const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics,handleGetDetails } = require('../controllers/url');
const router = express.Router();

router.post('/',handleGenerateNewShortURL);

router.get('/:shortId', handleGetDetails);

router.get('/analytics/:shortId',handleGetAnalytics);

module.exports = router;

