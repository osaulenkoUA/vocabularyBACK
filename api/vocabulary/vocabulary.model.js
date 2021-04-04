const mongoose = require('mongoose');
const { Schema } = mongoose;

const vocabularySchema = new Schema({
	word: { type: String, required: true },
	translate: { type: String, required: true },
	userId: { type: String, required: false },
});

const vocabularyModel = mongoose.model('Vocabulary', vocabularySchema);

module.exports = vocabularyModel;
