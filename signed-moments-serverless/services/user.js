"use strict";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();


export const userService = () => {
	const tableName = 'users_table';

	// TODO: add extra user details here
	const createParams = (address, nonce, tableName) => ({
		Item: {
		address: address,
		nonce: nonce,
		},
		TableName: tableName,
	});

	const getUserBy = async ({key, value}) => {
		const getParams = { TableName: tableName };
		const users = await dynamoDb.scan(getParams).promise();
		const [ user ] = users.Items.find(i => i[key] = value);

		return user;
	};

	const getUser = async (address) => {
		const user = await getUserBy({ key: 'walletAddress', value: address })

		if (!user) {
			const newUser = await createUser(address);
			return newUser
		}

		return user;
	};


	const createUser = async (walletAddress) => {
		const nonce = nonceService().createNonce();
		const putParams = createParams(walletAddress, nonce, tableName)
		const newUser = await dynamoDb.put(putParams).promise();

		return newUser
	}


	return { 
		getUser,
		getUserBy
	};
}



