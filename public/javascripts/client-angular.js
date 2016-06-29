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
        featured = $http({
            method: 'POST',
            url: urlBase + 'MapSearchJSON?do=featured_listings',
            data: $.param(postdata),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
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
  this.getMapData = function (mapnum) {
      var postdata =       
      {
        page_num: 0,
        results_num: 0,
        map_results_num: mapnum,
        map_page_num: 0,
        listing_type: 'featured_listings',
        user_id:1024566485
      }
      return $http({
          method: 'POST',
          url: urlBase + 'MapSearchJSON?do=featured_listings',
          data: $.param(postdata),
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })
  };
  this.getMapDataOffice = function (mapnum) {
      var postdata =       
      {
        page_num: 0,
        results_num: 0,
        map_results_num: mapnum,
        map_page_num: 0,
        listing_type: 'office_listings',
        user_id:1024566485
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
  $scope.lastTarget;
  
  $scope.hideBar = function($event){
    if($scope.lastTarget) $( $scope.lastTarget ).parent().toggleClass('active')
    $( $event.currentTarget ).parent().toggleClass('active')
    $('#navBar').removeClass('in')
    $scope.lastTarget = $event.currentTarget;
  }
})



app.controller('carouselController', function($scope, $rootScope){

})

app.controller('aboutController', function($scope,dataService){
  $scope.pglLoaded = false;
  $scope.realmarkers = [];
  $scope.gmaploading = false;
  dataService.getMapData(488).then(function(data){
    var markers = data.data.markers;
    var mapMarkers = [];
    for(var i = 0; i < markers.length; i++){
      if(markers[i].status != 'Active' || markers[i].status != "")
        mapMarkers.push({
    		id: markers[i].lid,
    		latitude: markers[i].latitude,
    		longitude: markers[i].longitude,
        html: "<strong>Your Address</strong><br>129/6 tristique eu eleifend sit amet,<br>tincid unt afringilla rhoncus lacus in condimentum. ",
        popup: false,
        icon: {
          image: "images/sold.png",
          iconsize: [40, 40],
          iconanchor: [30, 30]
        }   
        })
    }

    var mapSettings = {
      controls: {
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true
      },
      scrollwheel: false,
      markers: mapMarkers,
      latitude: 37.29,
      longitude: -121.87,
      zoom: 10
    };
    $("#about_props").gMap(mapSettings);
  });


    var map = $("#about_props").gMap();

    // Map Center At
    var mapCenterAt = function(options, e) {
      e.preventDefault();
      $("#about_props").gMap("centerAt", options);
    }

})

  
app.controller('featuredController', function($scope,$sce,dataService){
  $scope.featured = [];
  $scope.totallistings = 0;
  $scope.currentpage = 0;
  $scope.perpage = 21;
  $scope.pages = [];
  $scope.pageSelector = 1;
  $scope.show = 'tile';
  $scope.loading = true;
	$scope.gmaploading = true;
	$scope.realmarkers = [];
	$scope.pglShow = false;
  $scope.$watch(
        "totallistings",
        function handleFooChange( newValue, oldValue ) {
            if(newValue>0){
                dataService.getMapData(newValue).then(function(data){
                var markers = data.data.markers;
                
                //var realmarkers = [];
                
                for(var i = 0; i < markers.length; i++){
                  $scope.realmarkers.push({
                		"id": markers[i].lid,
                		"title": "Luxury Apartment with great views",
                		"latitude": markers[i].latitude,
                		"longitude": markers[i].longitude,
                		"image":"",
                		"link": "property-detail.html",
                		"price": "$358,000",
                		"forrea": "",
                		"description":"Lafayette St New York, NY <br> Phone: (123) 546-7890",
                		"area":"<strong>Area:</strong> 450<sup>m2</sup>",
                		"bedroom":'<i class="icons icon-bedroom"></i> 3',
                		"bathroom":'',
                		"map_marker_icon":"images/sold.png"      
                  })
                }
                
               $('#page-status').val(1);$('#page-status').trigger("chosen:updated");
               

                $scope.gmaploading = false;
               
              });
  
            }
        }
    );
    
  $scope.switchShow = function(_show){
    $('#'+$scope.show+'-li').toggleClass('active');
    $scope.show = _show;
    $('#'+$scope.show+'-li').toggleClass('active');
    
    if(!$scope.pglShow){
      PGL.propertiesMap($scope.realmarkers, 'properties_map');
      $scope.pglShow = true;
    }
    
  }
  dataService.getFeatured($scope.currentpage,$scope.perpage).then(function(data){
    for(var i = 0 ; i < data.data.listings.length; i++){
        $scope.featured.push(data.data.listings[i])
    }
    $scope.totallistings = data.data.paging.total;
    for(var i = 0; i < $scope.totallistings/$scope.perpage; i++){
      $scope.pages.push(i+1)
    }
    $scope.loading = false;
  })
  
  $scope.getNewHousing = function(){
    $scope.loading = true;
    var index = $scope.pageSelector-1;
    $scope.featured = [];
    if(index < ($scope.totallistings/$scope.perpage)){
      $scope.currentpage = index;
      dataService.getFeatured(index,$scope.perpage).then(function(data){
        $scope.featured = data.data.listings;
        $scope.loading = false;
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
});

app.controller('officeController', function($scope,$sce,dataService){
  $scope.featured = [];
  $scope.totallistings = 0;
  $scope.currentpage = 0;
  $scope.perpage = 21;
  $scope.pages = [];
  $scope.pageSelector = 1;
  $scope.show = 'tile';
  $scope.loading = true;
	$scope.gmaploading = true;
	$scope.realmarkers = [];
	$scope.pglShow = false;
  $scope.$watch(
        "totallistings",
        function handleFooChange( newValue, oldValue ) {
            if(newValue>0){
                dataService.getMapDataOffice(newValue).then(function(data){
                var markers = data.data.markers;
                
                //var realmarkers = [];
                
                for(var i = 0; i < markers.length; i++){
                  $scope.realmarkers.push({
                		"id": markers[i].lid,
                		"title": "Luxury Apartment with great views",
                		"latitude": markers[i].latitude,
                		"longitude": markers[i].longitude,
                		"image":"",
                		"link": "property-detail.html",
                		"price": "$358,000",
                		"forrea": "",
                		"description":"Lafayette St New York, NY <br> Phone: (123) 546-7890",
                		"area":"<strong>Area:</strong> 450<sup>m2</sup>",
                		"bedroom":'<i class="icons icon-bedroom"></i> 3',
                		"bathroom":'',
                		"map_marker_icon":"images/sold.png"      
                  })
                }
                
               $('#page-status').val(1);$('#page-status').trigger("chosen:updated");
               

                $scope.gmaploading = false;
               
              });
  
            }
        }
    );
    
  $scope.switchShow = function(_show){
    $('#'+$scope.show+'-li').toggleClass('active');
    $scope.show = _show;
    $('#'+$scope.show+'-li').toggleClass('active');
    
    if(!$scope.pglShow){
      PGL.propertiesMap($scope.realmarkers, 'properties_map');
      $scope.pglShow = true;
    }
    
  }
  dataService.getOffice($scope.currentpage,$scope.perpage).then(function(data){
    for(var i = 0 ; i < data.data.listings.length; i++){
        $scope.featured.push(data.data.listings[i])
    }
    $scope.totallistings = data.data.paging.total;
    for(var i = 0; i < $scope.totallistings/$scope.perpage; i++){
      $scope.pages.push(i+1)
    }
    $scope.loading = false;
  })
  
  $scope.getNewHousing = function(){
    $scope.loading = true;
    var index = $scope.pageSelector-1;
    $scope.featured = [];
    if(index < ($scope.totallistings/$scope.perpage)){
      $scope.currentpage = index;
      dataService.getFeatured(index,$scope.perpage).then(function(data){
        $scope.featured = data.data.listings;
        $scope.loading = false;
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
