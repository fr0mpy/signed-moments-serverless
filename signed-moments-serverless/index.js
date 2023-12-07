const loginService = require('./services/login');
const verifyService = require('./services/verify');
const registrationService = require('./services/registration');
const util = require('./utils/util');

const paths = {
	health: '/health',
	login: '/login',
	registration: '/registration',
	verify: '/verify',
	verifyUser: '/verify-USER'
}
  
  export const handler = async (event) => {
	console.log('request-event', event);
	let response; 
	
	switch(true) {
	case event.httpMethod === 'GET' && event.path === paths.health:
		response = util.buildResponse(200, {message: "health - all good"});
		break;
	case event.httpMethod === 'GET' && event.path === paths.verifyUser:
		response = util.buildResponse(200);
		break;

	//   case event.httpMethod === 'POST' && event.path === paths.registration:
	// 	const registrationBody = JSON.parse(event.body)
	// 	response = await registrationService.register(registrationBody) 
	// 	break;
	//   case event.httpMethod === 'POST' && event.path === paths.login:
	// 	const loginBody = JSON.parse(event.body)
	// 	response = await loginService.login(loginBody);
	// 	break;
	//   case event.httpMethod === 'POST' && event.path === paths.verify:
	// 	response = util.buildResponse(200);
	// 	break;
		default:
		response = util.buildResponse(404, {message: '404: Not Found - in handler'});
		break;
	}
	
	return response;
  };
  
  
  function buildResponse(statusCode, body = {}) {
	return {
	  statusCode,
	  headers: {
		'Access-Control-Allow-Origin': '*',
		"Content-Type": 'application/json'
	  },
	  body: JSON.stringify((body))
	}
  }