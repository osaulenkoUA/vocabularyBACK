const express = require('express');

const { addWord, getWord, authorize, validateId, deleteWord, updateWord } = require('./vocabulary.controller.js');

const vocabularyRouter = express.Router();

vocabularyRouter.post('/addword', authorize, addWord);
vocabularyRouter.get('/words', authorize, getWord);
vocabularyRouter.delete('/delete/:id', validateId, deleteWord);
vocabularyRouter.patch('/update/:id', authorize, validateId, updateWord);
module.exports = vocabularyRouter;
