const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../helpers/error.js');
const vocabularyModel = require('./vocabulary.model.js');
const { ObjectId } = require('mongodb');

async function addWord(req, res, next) {
	try {
		req.body.userId = req.userId;
		const contact = await vocabularyModel.create(req.body);
		return res.status(201).json(contact);
	} catch (err) {
		next(err);
	}
}
async function getWord(req, res, next) {
	try {
		const allworlds = await vocabularyModel.find({ userId: req.userId });
		return res.status(200).json(allworlds);
	} catch (err) {
		next(err);
	}
}

async function authorize(req, res, next) {
	try {
		const authorizationHeader = req.get('Authorization') || '';
		const token = authorizationHeader.replace('Bearer ', '');
		let userId;

		try {
			userId = await jwt.verify(token, process.env.JWT_SECRET).id;
		} catch (err) {
			next(new UnauthorizedError('User not authorized'));
		}

		req.userId = userId;

		next();
	} catch (err) {
		next(err);
	}
}
async function deleteWord(req, res, next) {
	try {
		const contactId = req.params.id;
		const contact = await vocabularyModel.findByIdAndDelete({ _id: contactId });
		!contact ? res.status(404).send() : res.status(200).json();
	} catch (err) {
		next();
	}
}

function validateId(req, res, next) {
	const { id } = req.params;

	if (!ObjectId.isValid(id)) {
		return res.status(400).send();
	}

	next();
}
module.exports = {
	addWord,
	getWord,
	authorize,
	deleteWord,
	validateId,
};
