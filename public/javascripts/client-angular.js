 (function(){
var app = angular.module('myApp', ['ngRoute', 'angular-loading-bar']);

app.service('dataService', ['$http', function ($http) {
  var urlBase = 'http://millerlister.com/';
  var featured;
  this.getFeatured = function (page,perpage) {
      var postdata =       
      {
        page_num: page,
        results_num: perpage,
        map_results_num: 0,
        map_page_num: 0,
        listing_type: 'featured_listings',
        user_id: 1024566485
      }

      //if(!featured[perpage]){
        featured = $http({
            method: 'POST',
            url: urlBase + 'MapSearchJSON?do=featured_listings',
            data: $.param(postdata),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
      //}
      return featured;
  }
  this.getOffice = function (page,perpage) {
      var postdata =       
      {
        page_num: page,
        results_num: perpage,
        map_results_num: 0,
        map_page_num: 0,
        listing_type: 'office_listings',
        user_id: 1024566485
      }
      return $http({
          method: 'POST',
          url: urlBase + 'MapSearchJSON?do=office_listings',
          data: $.param(postdata),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
  };
  this.getMls = function () {
      return $http.get(urlBase + 'MapSearchJSON?do=query_mls_disclaimers');
  };
  this.getCities = function () {
      return $http.get(urlBase + 'mls_areas?mls=REIL&selectedCounty=SANTA+CLARA+CA&chosenAreas=&chosenCities=')
  }
  this.getOpenHouse = function(){
      return $http.get('/api/openhouse')
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
  $locationProvider.html5Mode(true);
});

app.controller('navController', function($scope){
  $scope.hideBar = function(){
    $('#navBar').removeClass('in')
  }
})

app.controller('carouselController', function($scope, $rootScope){

})

app.controller('featuredController', function($scope,$sce,dataService){
  $scope.featured = [];
  $scope.totallistings = 0;
  $scope.currentpage = 0;
  $scope.perpage = 21;
  $scope.pages = [];
  $scope.pageSelector = 1;
  
  setInterval(function(){
    if($('#page-status')[0].selectedIndex != '1'){
      $('#page-status')[0].selectedIndex = '1';
      console.log('a')
    }
  },1000)

  dataService.getFeatured($scope.currentpage,$scope.perpage).then(function(data){
    for(var i = 0 ; i < data.data.listings.length; i++){
        $scope.featured.push(data.data.listings[i])
    }
    $scope.totallistings = data.data.paging.total;
    for(var i = 0; i < $scope.totallistings/$scope.perpage; i++){
      $scope.pages.push(i+1)
    }
  })
  $scope.getNewHousing = function(){
    index = $scope.pageSelector-1;
    console.log(index)
    $scope.featured = [];
    if(index < ($scope.totallistings/$scope.perpage)){
      $scope.currentpage = index;
      dataService.getFeatured(index,$scope.perpage).then(function(data){
        $scope.featured = data.data.listings;
      });
    }
  }
  $scope.getNumberArray = function(){
    var arr = [];
    for(var i = 0 ; i < $scope.show.length/3; i++){
      arr.push(i);
    }
    return arr;
  }
  /*
  $scope.prevNumbers = function(){
    if(!$('#prev-list').hasClass('disabled')){
      for(var i = 0; i < 5; i++){
        $scope.pages[i] -= 5;
      }
    }
  }
  $scope.nextNumbers = function(){
    if(!$('#next-list').hasClass('disabled')){
      for(var i = 0; i < 5; i++){
        $scope.pages[i] += 5;
      }
    }
  }*/
});

app.controller('officeController', function($scope,$sce,dataService){
  $scope.featured = [];
  $scope.totallistings = 0;
  $scope.currentpage = 0;
  $scope.perpage = 21;
  $scope.pages = [0,1,2,3,4];
  dataService.getOffice($scope.currentpage,$scope.perpage).then(function(data){
    for(var i = 0 ; i < data.data.listings.length; i++){
        $scope.featured.push(data.data.listings[i])
    }
    $scope.totallistings = data.data.paging.total;
  })
  $scope.getNewHousing = function(index){
    if(index < ($scope.totallistings/$scope.perpage)){
      $scope.currentpage = index;
      dataService.getOffice(index,$scope.perpage).then(function(data){
        $scope.featured = data.data.listings;
      });
    }
  }
  $scope.getNumberArray = function(){
    var arr = [];
    for(var i = 0 ; i < $scope.show.length/3; i++){
      arr.push(i);
    }
    return arr;
  }
  $scope.prevNumbers = function(){
    if(!$('#prev-list').hasClass('disabled')){
      for(var i = 0; i < 5; i++){
        $scope.pages[i] -= 5;
      }
    }
  }
  $scope.nextNumbers = function(){
    if(!$('#next-list').hasClass('disabled')){
      for(var i = 0; i < 5; i++){
        $scope.pages[i] += 5;
      }
    }
  }
});

app.controller('renderController', function($scope,$sce,dataService){
  $scope.openhouse = "";
  $scope.disclaimer = "";

  dataService.getOpenHouse().then(function(data){
    $scope.openhouse = data.data;
  })
  dataService.getMls().then(function(data){
    $scope.disclaimer = data.data[0];
  })
  $scope.renderHtml = function(html_code)
  {
      //render disclosure which is enclosed in html
      return $sce.trustAsHtml(html_code);
  };
});

app.controller('contactController', function($scope,$sce,dataService){
  $scope.showpagecontact = true;
  $scope.changePageContact = function(){
    $scope.showpagecontact = false;
  }
  $scope.submitMarketForm = function(){
    $('#FR_form').submit();
  }
});

})();
