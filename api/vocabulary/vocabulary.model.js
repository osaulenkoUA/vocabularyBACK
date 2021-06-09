const mongoose = require('mongoose');
const { Schema } = mongoose;

const vocabularySchema = new Schema({
	word: { type: String, required: true },
	translate: { type: String, required: true },
	userId: { type: String, required: false },
	learned: { type: Boolean, default: false, required: false },
	stars: { type: Number, required: false, default: 1 },
});

vocabularySchema.statics.findWordByIdAndUpdate = findWordByIdAndUpdate;

async function findWordByIdAndUpdate(wordId, updateParams) {
	return this.findByIdAndUpdate(
		wordId,
		{
			$set: updateParams,
		},
		{
			new: true,
		}
	);
}

const vocabularyModel = mongoose.model('Vocabulary', vocabularySchema);

module.exports = vocabularyModel;
