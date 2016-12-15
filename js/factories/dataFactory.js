 "use strict"; 

 app.factory("dataFactory", function($http, authFactory, fbCreds) {

 	//Possibly use date.now
 	



 	console.log('datafactory loaded');
 	var currentUser;

// USER POST, PUT AND GETTER
		let postUser = (userObject) => {
 		return new Promise((resolve, reject) => {
 			console.log('resolve', resolve);
 			$http.post(`${fbCreds.databaseURL}/user.json`, angular.toJson(userObject))
 			.success((userObject) => {
 				userObject.id = userObject.name;
 				console.log('userObject name', userObject)
 				resolve(userObject);
 			})
 	
 	.error( (error) => {
			reject(error);
		  });
		});
	};
 	
 		let updateUser = (userObject) => {
 		currentUser = authFactory.getUser(); 
 		return new Promise((resolve, reject) => {
 			console.log('resolve', resolve);
 			$http.put(`${fbCreds.databaseURL}/user.json?orderBy='uid'&equalTo='${currentUser}'`, angular.toJson(userObject))
 			.success((userObject) => {
 				userObject.id = userObject.name;
 				console.log('userObject name', userObject)
 				resolve(userObject);
 			})
 	
 	.error( (error) => {
			reject(error);
		  });
		});
	};

	let userGetter = () => {
		let user = []; 
		console.log('user', user)

		return new Promise((resolve, reject) => {
			$http.get(`${fbCreds.databaseURL}/user.json`)
			.success((userObject) => {
				console.log('userobject from get', userObject);
				let userInfo = userObject;
				Object.keys(userInfo).forEach( (key) => {
					userInfo[key].id = key; 
					user.push(userInfo[key]); 

				});
				resolve(user); 
			})
			.error((error) => {
				reject(error);
			});

		}); 

	}; 

// OUTING POST AND GETTER

	let postOuting = (outingObject) => {
 		
 		return new Promise((resolve, reject) => {
 			console.log('resolve', resolve);
 			$http.post(`${fbCreds.databaseURL}/outing.json`, angular.toJson(outingObject))
 			.success((outingObject) => {
 				outingObject.id = outingObject.name;
 				resolve(outingObject);
 			})
 	
 	.error( (error) => {
			reject(error);
		  });
		});
	};

	let outingGetter = () => {
		let outing = []; 
		console.log('outing', outing)
		return new Promise((resolve, reject) => {
			$http.get(`${fbCreds.databaseURL}/outing.json`)
			.success((outingObject) => {
				let outingInfo = outingObject;
				Object.keys(outingInfo).forEach( (key) => {
					outingInfo[key].id = key; 
					outing.push(outingInfo[key]); 

				});
				resolve(outing); 
			})
			.error((error) => {
				reject(error);
			});

		}); 

	}; 

// Contact POST, PUT AND GETTER

		let postContact = (contactObject) => {
		console.log('107 contactobj', contactObject);

 		currentUser = authFactory.getUser(); 

 		return new Promise((resolve, reject) => {
 			console.log('contactobj', contactObject);
 			$http.post(`${fbCreds.databaseURL}/contact.json`, angular.toJson(contactObject))
 			.success((contactObject) => {
 				contactObject.id = contactObject.name;
 				resolve(contactObject);
 			})
 	
 	.error( (error) => {
			reject(error);
		  });
		});
	};
 	
 		let updateContact = (contactObject) => {
 		currentUser = authFactory.getUser(); 
 		return new Promise((resolve, reject) => {
 			$http.put(`${fbCreds.databaseURL}/contact.json?orderBy='uid'&equalTo='${currentUser}'`, angular.toJson(contactObject))
 			.success((userObject) => {
 				contactObject.id = contactObject.name;
 				resolve(contactObject);
 			})
 	
 	.error( (error) => {
			reject(error);
		  });
		});
	};

	let contactGetter = () => {
		let contact = []; 
		console.log('contact', contact)

		return new Promise((resolve, reject) => {
			$http.get(`${fbCreds.databaseURL}/contact.json`)
			.success((contactObject) => {
				let contactInfo = contactObject;
				console.log('contactinfo', contactInfo);
				Object.keys(contactInfo).forEach( (key) => {
					contactInfo[key].id = key; 
					contact.push(contactInfo[key]); 

				});
				resolve(contact); 
			})
			.error((error) => {
				reject(error);
			});

		}); 

	}; 

// RETURN ALL FUNCTIONS 

return {postUser, postOuting, postContact, updateUser, updateContact, userGetter, outingGetter, contactGetter};

}); 
 	
