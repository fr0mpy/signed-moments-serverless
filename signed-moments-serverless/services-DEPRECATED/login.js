const AWS = require('aws-sdk');
const util = require('../utils/util');
const bcrypt = require('bcrypt');

AWS.config.update({
	region: 'us-east-1',
});


const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = 'users_signed-moments';

async function login(user) {
	const {username, password} = user;

	if (!username || !password) {
		
	}
}