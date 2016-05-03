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

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl: '../partials/home.html'
  })
  .when('/about', {
      templateUrl: '../partials/about.html',
  }).when('/bio', {
      templateUrl: '../partials/bio.html',
  }).when('/find', {
      templateUrl: '../partials/find.html',
  }).when('/featured', {
      templateUrl: '../partials/featured.html',
  }).when('/mortgage', {
      templateUrl: '../partials/mortgage.html',
  }).when('/open', {
      templateUrl: '../partials/open.html',
  }).when('/office', {
      templateUrl: '../partials/office.html',
  }).when('/evaluation', {
      templateUrl: '../partials/evaluation.html',
  }).when('/homecare', {
      templateUrl: '../partials/homecare.html',
  }).when('/reports', {
      templateUrl: '../partials/reports.html',
  }).when('/seller', {
      templateUrl: '../partials/seller.html',
  }).when('/schools', {
      templateUrl: '../partials/schools.html',
  }).when('/utilities', {
      templateUrl: '../partials/utilities.html',
  }).when('/community', {
      templateUrl: '../partials/community.html',
  }).when('/disclosures', {
      templateUrl: '../partials/disclosures.html',
  }).when('/contact', {
      templateUrl: '../partials/contact.html',
  })
  .
  otherwise({ redirectTo: '/'});

});



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
    console.log($scope.carousel);

    for(var i = 0 ; i < data.data.listings.length; i++){
      if(data.data.listings[i].status == 'Active'){
        data.data.listings[i].show = false;
        $scope.active.push(data.data.listings[i])
      }
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
    console.log('a')
    $('#mobilenavigator').hide();
  }
  $scope.getWidth = function(){
   return (window.innerWidth > 0) ? window.innerWidth : screen.width;
  }
  $('.container').css('width','');
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
