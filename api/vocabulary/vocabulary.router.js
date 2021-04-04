const express = require('express');

const { addWord, getWord, authorize, validateId, deleteWord } = require('./vocabulary.controller.js');

// const authorize = require('../users/user.controller.js');
const vocabularyRouter = express.Router();

vocabularyRouter.post('/addword', authorize, addWord);
vocabularyRouter.get('/words', authorize, getWord);
vocabularyRouter.delete('/delete/:id', validateId, deleteWord);

module.exports = vocabularyRouter;
