"use strict";

import { userService } from "./user";

const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const crypto = require("crypto");


export const nonceService = () => {

	const createNonce = () => crypto.randomBytes(16).toString("hex");

	return { updateUserNonce };
}



