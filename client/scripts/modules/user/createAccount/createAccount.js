angular.module('crash.createAccount', ['ngCookies'])

.controller('CreateAccountController', function($cookies, UserService, $window, $location){

  var self = this;
  self.user = {};
  self.errorMessage = '';
  self.facebookLogin = false;

  /***
    get the username from cookies
  ***/
  self.getUser = function(){

    UserService.getAccountByUsername($cookies.get('username'))
      .then(function(user){
        console.log('user : ', user);
        self.user = user;
        if(user) {
          self.facebookLogin = true;
        } else {
          self.facebookLogin = false;
        }
        console.log('self.user : ', self.user);
      })
      .catch(function(err){
        self.facebookLogin = false;    
        console.log('user not received...', err);
      });
  };


  /***
    send the new user to the server to be stored in the database
    get a session token back to be stored into window localStorage
  ***/
  self.createAccount = function(){
    console.log('create account for user : ', self.user);
    var promise;
    if(!self.facebookLogin) {
      promise = UserService.createAccount(self.user);
    } else {
      promise = UserService.updateUserAccount(self.user);
    }
      /***
        response will be an {token:token, user:user}
      ***/
    promise.then(function(data){
        console.log('created account, session :', data.token);

        $window.localStorage.setItem('com.crash', data.token);

        $location.path('/');
      })
      /***
        Tell the user the error, ex: username already exists, allow them to enter in a different username...
      ***/
      .catch(function(err){
        console.log('Error creating account...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
      });
  };

});
