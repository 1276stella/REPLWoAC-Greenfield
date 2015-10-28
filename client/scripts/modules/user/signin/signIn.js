angular.module('crash.signIn', ['ngCookies'])

.controller('SignInController', function($cookies, UserService, $window, $location){
  
  var self = this;
  self.errorMessage = '';
  self.user = {};

  /***
    Pass the user object to the signin function which holds the username and password
    Sign the User In and get a session back from the server
  ***/

  self.signIn = function(){
    console.log('sign user in...');
    UserService.signin(self.user)
      .then(function(data){
        console.log('token : ', data);
        $window.localStorage.setItem('com.crash', data.token);
        $location.path('/');
      })
      /***
        Tell the user the error, ex: the username or password provided didn't match the DB
        Reset the input so the user can enter the information again
      ***/
      .catch(function(err){
        console.log('Error signing in the user ...', err.data);
        self.errorMessage = err.data.error;
        self.user.username = '';
        self.user.password = '';
      });
  };

  // setInterval(function() {
  //  var token = $cookies.get('token');
  //  $window.localStorage.setItem('com.crash', token);
  //       $location.path('/profile');   
  //  console.log('Cookies Clinet', token);
  // }, 5000);
  // $window.localStorage.setItem('com.crash', token);
  // $location.path('/profile');

  self.signInFacebook = function() {
    UserService.signinFacebook()
      .then(function(data){
        console.log('data', data);
        $window.localStorage.setItem('com.crash', data.token);
        $location.path('/profile');
      })
      .catch(function(err){
        console.log('Error signing in the user ...', err.data);
        // self.errorMessage = err.data.error;
        // self.user.username = '';
        // self.user.password = '';
      });
  };
  
});
