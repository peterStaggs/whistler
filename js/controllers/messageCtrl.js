app.controller('messageCtrl', function($http, $scope, $timeout){
		
		function sendTextMessage (to, body) {
		var TWILIO_ACCOUNT_SID = 'AC1990f4c54a0ac62c9f0f5eddd5cb2990'
		var TWILIO_API_SID = 'SKb97f6d0b7666109273f6308b024e7c46'
		var TWILIO_API_SECRET = 'DHUqnKP8QRdyu1F5u5mR4lcB7dega5c6'
		//primitive encryption/obfuscation/compression 
		var TWILIO_API_AUTH_BASE64 = btoa(TWILIO_API_SID + ':' + TWILIO_API_SECRET)
		var TWILIO_API_URL = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`
		//Headers will always be sent with a http request--you can inspect these in network tab
		var TWILIO_API_HEADERS = {
			headers: {
				'Authorization': `Basic ${TWILIO_API_AUTH_BASE64}`,
				//this is the default form content type
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}

		var from = '+17078193060'

		$http
			.post(TWILIO_API_URL,
				`To=${to}&From=${from}&Body=${body}`,
				TWILIO_API_HEADERS)
			.then(console.log)
		}
		
		$scope.message={
			phone: '',
			text: ''
		};

		$scope.fireText = () => {
			console.log('message sent!');
 			sendTextMessage($scope.message.phone, $scope.message.text);

 		 }

 		 var timerFunc; 

 		$scope.timeAmount={
 			time: 0
 		};

 		$scope.setTimer = () => {
 			console.log('function was called')
 			timerFunc = $timeout(function () {
 			console.log('message sent')
        	$scope.fireText()}, $scope.timeAmount.time * 60000);
 		};

 		$scope.stopTimer = () => {
 			console.log('timer stopped')
 			$timeout.cancel(timerFunc);
 		}


});