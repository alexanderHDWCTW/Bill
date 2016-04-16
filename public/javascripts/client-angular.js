 (function(){
var app = angular.module('myApp', ['ngRoute']);

app.service('dataService', ['$http', function ($http) {
  var urlBase = 'http://millerlister.com/';
  this.getFeatured = function () {
      return $http.get(urlBase + 'MapSearchJSON?do=featured_listings');
  };
  this.getOffice = function () {
      return $http.get(urlBase + 'MapSearchJSON?do=office_listings');
  };
  this.getMls = function () {
      return $http.get(urlBase + 'MapSearchJSON?do=query_mls_disclaimers');
  };
  this.getCities = function () {
      return $http.get(urlBase + 'mls_areas?mls=REIL&selectedCounty=SANTA+CLARA+CA&chosenAreas=&chosenCities=')
  }
}]);

app.controller('maincontroller', function($scope,$sce,dataService){
  dataService.getFeatured().then(function(data){
    console.log(data.data)
  })
});

app.controller('featuredController', function($scope,$sce,dataService){

});

app.controller('officeController', function($scope,$sce,dataService){

});

app.controller('openHouseController', function($scope,$sce,dataService){

});

})();
