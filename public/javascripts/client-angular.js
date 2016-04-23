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
  $scope.active = [];
  $scope.sold = [];
  $scope.pending = [];
  $scope.carousel = [];
  $scope.office = [];
  dataService.getFeatured().then(function(data){
    $scope.carousel.push(data.data.listings[0]);
    $scope.carousel.push(data.data.listings[1]);
    $scope.carousel.push(data.data.listings[2]);

    for(var i = 0 ; i < data.data.listings.length; i++){
      if(data.data.listings[i].status == 'Active')
        $scope.active.push(data.data.listings[i])
      if(data.data.listings[i].status == 'Pending')
         $scope.pending.push(data.data.listings[i])
      if(data.data.listings[i].status == 'Sold')
         $scope.sold.push(data.data.listings[i])
    }
  })
    dataService.getOffice().then(function(data){
    //TODO:Filter
    $scope.office = data.data.listings;
  })
  $scope.getActive = function(){
    return $scope.active;
  }
  $scope.getPending = function(){
    return $scope.pending;
  }
  $scope.getSold = function(){
    return $scope.sold;
  }
  $scope.toggleMargin = function(){
    $('#page').toggleClass('margin200');
  }
  $scope.getWidth = function(){
   return (window.innerWidth > 0) ? window.innerWidth : screen.width;
  }
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
