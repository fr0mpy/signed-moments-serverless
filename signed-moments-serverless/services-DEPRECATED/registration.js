const AWS = require('aws-sdk');
const util = require('../utils/util');
const bcrypt = require('bcrypt');

AWS.config.update({
	region: 'us-east-1',
});


const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTable = 'users_signed-moments';

async function register(userInfo) {
	const {name, email, username, password} = userInfo;

	if (!name || !email || !username || !password) {
		return util.buildResponse(400, { message: 'All fields are required' })
	};

	const dbUser = await getUser(username.toLowerCase().trim());

	if (dbUser && dbUser.username) {
		return util.buildResponse(400, { message: 'This username is already taken :(' })
	}

	const encryptedPassword = bcrypt.hashSync(password.trim(), 10);

	const user = {
		name: name.toLowerCase().trim(),
		email: email.toLowerCase().trim(),
		username: username.toLowerCase().trim(),
		password: encryptedPassword
	};

	const savedUserResponse = await saveUser(user);
	
	if (savedUserResponse) {
		return util.buildResponse(503, {message: 'Server error - please try again later'})
	};

	return util.buildResponse(200, {message: `Welcome ${username.toLowerCase().trim()}`})
}

async function getUser(username) {
	const params = {
		TableName: userTable,
		Key: {
			username: username.toLowerCase().trim()
		}
	}

	return dynamoDB.get(params).promise(resolve, reject)
	.then(res => resolve(res.Item))
	.catch(e => console.log('error:', e));
}

async function saveUser(user) {
	const params = {
		TableName: userTable,
		Item: user
	}

	return dynamoDB.put(params).promise(resolve, reject)
	.then(res => resolve(res.Item))
	.catch(e => console.log('error:', e));
}

module.exports.register = register;