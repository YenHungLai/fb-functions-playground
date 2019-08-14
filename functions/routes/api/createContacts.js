const express = require('express');
const router = express.Router();
const firestore = require('../../index').firestore;
const axios = require('axios');

router.get('/', (req, res) => {
	// Populate DB with fake data
	axios.get('https://jsonplaceholder.typicode.com/users?_limit=5').then(response => {
		response.data.forEach(item => {
			firestore
				.collection('contacts')
				.doc()
				.set(item);
		});
		res.json({ msg: 'Document successfully written' });
	});
});

module.exports = router;
