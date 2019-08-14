const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');

admin.initializeApp({
	databaseURL: 'https://capstonetesting-4b021.firebaseio.com'
});
const app = express();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });
exports.firestore = firestore;

// Middleware
// const logger = (req, res, next) => {
// 	console.log('I am logger');
// 	console.log(req.method);
// 	console.log(req.body);
// 	if (req.method !== 'GET') {
// 		// Add data to req body
// 		req.body.name = 'Jacob';
// 	}
// 	next();
// };
// app.use(logger);
// app.use(bodyParser.json());

// Routes
app.use('/helloWorld', require('./routes/api/helloWorld'));
app.use('/getContacts', require('./routes/api/getContacts'));
app.use('/createContacts', require('./routes/api/createContacts'));

// Remove before serving
// module.exports = app;

// Pass an express app as a single firebase function
exports.api = functions.https.onRequest(app);

exports.triggerFunction = functions.firestore
	.document('/users/{id}')
	.onWrite((change, context) => {
		console.log('I was triggered');
		console.log(change.after.data());
		console.log(context.params);
		return { before: change.before.data(), after: change.after.data() };
	});
