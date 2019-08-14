const express = require('express');
const router = express.Router();
const firestore = require('../../index').firestore;

router.get('/', (req, res) => {
	firestore
		.collection('contacts')
		.get()
		.then(snapshot => {
			const results = [];
			snapshot.forEach(doc => {
				console.log(doc.id, '=>', doc.data());
				results.push(doc.data());
			});
			res.json(results);
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
});

module.exports = router;
