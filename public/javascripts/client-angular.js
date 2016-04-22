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

app.controller('mainController', function($scope,$sce,dataService){
  $scope.featured = [];
  $scope.carousel = [];
  $scope.office = [];
  dataService.getFeatured().then(function(data){
    //TODO:Filter
    console.log(data.data.listings)
    for(var i = 0 ; i < data.data.listings.length; i++){
      if(data.data.listings[i].status == 'Active')
        $scope.featured.push(data.data.listings[i])
    }
    $scope.carousel.push(data.data.listings[0]);
    $scope.carousel.push(data.data.listings[1]);
    $scope.carousel.push(data.data.listings[2]);
  })
    dataService.getOffice().then(function(data){
    //TODO:Filter
    $scope.office = data.data.listings;
  })
});

app.controller('carouselController', function($scope, $rootScope){

})

app.controller('featuredController', function($scope,$sce,dataService){

});

app.controller('officeController', function($scope,$sce,dataService){

});

app.controller('openHouseController', function($scope,$sce,dataService){

});

})();
