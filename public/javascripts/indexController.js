 angular.module('myApp').controller('indexController', ['$scope', '$sce', 'dataService', function($scope, $sce, dataService){
  $scope.carousel = [];
  $scope.rows = [];
  $scope.rowsize = 3;
  $scope.totallistings = 0;
  $scope.currentpage = 0;
  $scope.perpage = $scope.rowsize;
  $scope.listingclasses = [];
  $scope.disclaimer = "";
  $scope.loading = true;

  $scope.loadMore = function(){
  $scope.loading = true;

    $scope.perpage += $scope.rowsize;
    dataService.getFeatured($scope.currentpage,$scope.perpage).then(function(data){
      console.log(data.data)
      $scope.carousel.push(data.data.listings[0]);
      $scope.carousel.push(data.data.listings[1]);
      $scope.carousel.push(data.data.listings[2]);
      for(var i = 0; i < data.data.listings.length/3; i++){
        //push housing to house array
        /*
        if(!$scope.rows[i])
          $scope.rows.push([data.data.listings[i*$scope.rowsize],data.data.listings[i*$scope.rowsize+1],data.data.listings[i*$scope.rowsize+2]])
        */
        if(!$scope.rows[i]){
          var _rows =  [];
          for(var v = 0; v < $scope.rowsize; v++){
            _rows.push(data.data.listings[i*$scope.rowsize+v])
          }
          $scope.rows.push(_rows)
        }
      

        //add listing classes to array
        for(var z = 0; z < $scope.rowsize; z++){
          var exists = false;
          for(var x = 0; x < $scope.listingclasses.length; x++){
            if($scope.listingclasses[x]==data.data.listings[i*$scope.rowsize+z].listingClass) exists = true;
          }
          if(!exists) $scope.listingclasses.push(data.data.listings[i*$scope.rowsize+z].listingClass);
        }
      }
      $scope.totallistings = data.data.paging.total;
      $scope.loading = false;
    });
  }

  $scope.loadMore();
  
  $(window).resize(function(){
   if($("#offer1").height() > $("#offer2").height()){
      $("#offer2").height($("#offer1").height());
    }else{
      $("#offer1").height($("#offer2").height());
   }
   /*
     if($(window).width() < 975){
      $scope.rowsize = 2;
    }else{
      $scope.rowsize = 3;
    }*/

  });

 
  $scope.load = function() {
    if($("#offer1").height() > $("#offer2").height()){
      $("#offer2").height($("#offer1").height());
    }else{
      $("#offer1").height($("#offer2").height());
    }

   };

   $scope.load();

}]);