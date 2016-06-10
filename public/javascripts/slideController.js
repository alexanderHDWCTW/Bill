 angular.module('myApp').controller('slideController', ['$scope', '$sce', '$location', 'dataService', 
  function($scope, $sce, $location, dataService){
  $scope.show = false;
  $scope.carousel = [];
  dataService.getFeatured($scope.currentpage,$scope.perpage).then(function(data){
    $scope.carousel.push(data.data.listings[0]);
    $scope.carousel.push(data.data.listings[1]);
    $scope.carousel.push(data.data.listings[2]);
  });

    $scope.$on('$routeChangeSuccess', function(event, current) {
      if($location.path() == '/' || $location.path() == '/home'){
        $scope.show = true;
      }else{
        $scope.show = false;
      }
    });

}]);