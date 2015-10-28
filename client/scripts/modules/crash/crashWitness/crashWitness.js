angular.module('crash.crashWitness', [])

.controller('CrashWitnessController', function(CrashEventObj, SendGridService) {
  
  var self = this;
  self.witnessArr = [];
  self.person = {};
  self.personMaster = {
    firstname : '',
    lastname : '',
    phoneNumber : '',
    email : ''
  };

  /***
    store the person object into the witness array
    clear the input text fields after adding the person, so the user can easily add another witness
    angular.copy(self.master) clears ubinds the person object
  ***/
  self.addWitness = function(){
    console.log('add witness...');
    self.witnessArr.push(self.person);
    self.person = angular.copy(self.master);
  };

  /***
    save the witness array into the CrashEventObj.crashEvent object
  ***/
  self.save = function(){
    console.log('saving...');
    CrashEventObj.crashEvent.witnessArr = self.witnessArr;
  };

  self.sendGrid = function(){
    console.log('SEND GRID');
  };

});
