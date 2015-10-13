angular.module('criminalsApp', [])
  .controller('CriminalsController', CriminalsController);

CriminalsController.$inject = ['$http'];

function CriminalsController($http){
  var self = this;
  self.all = [];

  // Our seed data to try the app
  // this.all = [
  //   {name: 'Al Capone', location: "Miami, Florida, USA", status: "Dead" },
  //   {name: 'Professor Moriarty', location: "Reinchenbaum Falls, Chicago", status: "Unknown" }
  // ];

  function getCriminals() {
    $http
      .get('http://localhost:3000/criminals')
      .then(function(response) {
        console.log(response)
        self.all = response.data.criminals;
      });
  }

  getCriminals();

  // console.log(self.all)
  self.addCriminal = addCriminal;
  self.newCriminal = {};

  function addCriminal() {
    console.log('inside addCriminal');
    $http
      .post('http://localhost:3000/criminals', self.newCriminal)
      .then(function(response) {
          console.log(response)
          getCriminals();
      })
    self.newCriminal = {};
  }

  self.deleteCriminal = deleteCriminal;
  self.criminal = {};
  
  function deleteCriminal(criminal) {
    console.log('inside deleteCriminal');
    console.log(criminal);
    console.log(criminal.id);
    $http
      .delete('http://localhost:3000/criminals/' + criminal._id)
      .then(function(response) {
        console.log('After delete');
        getCriminals();
      });
    self.criminal = {};
  }

  self.selectCriminal = selectCriminal;

  function selectCriminal(criminal) {
    console.log('inside SELECTCriminal');
    console.log("Criminal for SELECT: ", criminal);
    self.oneCriminal = criminal;
  }




  self.updateCriminal = updateCriminal;
  //self.oneCriminal = {};
  
  function updateCriminal() {
    console.log('inside updateCriminal');
    console.log("Criminal for update: ", self.oneCriminal);
    $http
      .patch('http://localhost:3000/criminals/' + self.oneCriminal._id, self.oneCriminal)
      .then(function(response) {
        console.log(response);
        console.log('After update');
        getCriminals();
      });
    self.oneCriminal = null;
  }








}