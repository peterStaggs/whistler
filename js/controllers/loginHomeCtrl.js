"use strict"; 

app.controller('loginHomeCtrl', function($scope, authFactory, dataFactory, $window){
	console.log('this is loginHomeCtrl');
    dataFactory.userGetter();
    dataFactory.outingGetter();
    dataFactory.contactGetter();
    let contactObject = contactFunction();

    dataFactory.postContact(contactObject); 


// Define the Object Containing info from the "Who am I" form as an object


	let userObject = {
	    uid:null, 
      userName: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      biography: '',
      postalCode: '',
      contactOne: ''
    };

// Add a UID to the Personal Info
    userObject.uid = authFactory.getUser();
  	dataFactory.postUser(userObject)
  	.then((userObject) => {
  	console.log('userObj', userObject);
	 });
 
// Update the contact information 
  let updateUser = (userObject) => {
    datafactory.updateUser(userObject); 
  }; 

// Define the outing object from the form's user input. This will be the primary content on the page
function outingFunction() {
  let outingObject = {
	    uid: null,
      type_of_outing: 'other',
      location: 'bro',
      otherPeople: 'vfecd',
      date: 'bvfecd',
      start_time: 've',
      end_time: 'CA'
    };

// Give the outing info a UID
    outingObject.uid = authFactory.getUser(); 
	  dataFactory.postOuting(outingObject)
	  .then((outingObject) => {
		console.log('outingObject', outingObject);
	 });
  };

// Define the Contacts object, created from user input
  function contactFunction()  {
    return {
        uid: null, 
        contactOne: 'maria',
        contactTwo: 'anna',
        contactThree: 'sam'

      };
    console.log('contactObj in ctrl', contactObject);
// Add a UID to the Personal Info
    contactObject.uid = authFactory.getUser();
    dataFactory.postContact(contactObject)
    .then((contactObject) => {
    console.log('contactObj', contactObject);
    });
   };
  
  let updateContact = (contactObject) => {
    datafactory.updateContact(contactObject); 
  }; 

    dataFactory.postUser(userObject); 


}); 
