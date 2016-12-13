app.controller('loginHomeCtrl', function($scope, authFactory, dataFactory, $window){
	console.log('this is loginHomeCtrl');
    dataFactory.userGetter();
    dataFactory.outingGetter();

let userFunction = () => {
	let obj= {
	    uid:null, 
      userName: 'cool',
      firstName: 'bro',
      lastName: 'vfecd',
      address: 'bvfecd',
      city: 've',
      state: 'CA',
      biography: 'wgvfe',
      postalCode: 'wvefd',
      contactOne: ''
    };

    obj.uid = authFactory.getUser();
  	dataFactory.postUser(obj)
  	.then((userObject) => {
  	console.log('userObj', userObject);
	 });
  };

  let updateUser = (userObject) => {
    datafactory.updateUser(userObject); 
  }; 
	
let outingFunction = () => {
  let otherobj= {
	  uid: null,
      type_of_outing: 'other',
      location: 'bro',
      otherPeople: 'vfecd',
      date: 'bvfecd',
      start_time: 've',
      end_time: 'CA'،
      contact: ''
    };
    
    otherobj.uid = authFactory.getUser(); 
	  dataFactory.postOuting(otherobj)
	  .then((outingObject) => {
		console.log('outingObject', outingObject);
	 });
  };

}); 
