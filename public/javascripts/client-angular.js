 (function(){                                                                     
var app = angular.module('myApp', ['ngRoute']);


app.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
      templateUrl: '../partials/games.html',
      controller: 'gamesctrl'
  }).when('/create', {
      templateUrl: '../partials/create.html',
      controller: 'createCtrl'
  }).when('/games/:id', {
      templateUrl: '../partials/game.html',
      controller: 'active'
  }).
  otherwise({ redirectTo: '/'});
  $locationProvider.html5Mode(true);
});


app.controller('gamesctrl', function($scope,$sce){
  var tag, firstScriptTag, player;
  if(typeof YT == 'undefined'){
    tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  var inter = setInterval(function(){ 
    if(typeof YT != 'undefined'){
      player = new YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: 'GjoX2LqOAuQ',
      playerVars: {
        autoPlay: 0
      }
     });
     clearInterval(inter)
    }
  }, 500);

  $scope.tldw = 
    {
      date:"25 October 2016",
      videoId:"GjoX2LqOAuQ",
      title:"TSM vs CLG",
      highlights:[
        {start:960,end:1000,text:'Doublelift getting tower dove'},
        {start:1140,end:100,text:'4v3 team fight'},
        {start:1915,end:50,text:'Hauntzer getting caught'},
        {start:2068,end:80,text:'Team fight at 30 mins'},
        {start:2194,end:300,text:'5v5 team fight'},
        {start:2545,end:40,text:'YellowStar getting caught'},
        {start:2740,end:40,text:'Game ending fight'},
      ]
    };

  
  $scope.switchUrl = function(v){
    player.seekTo($scope.tldw.highlights[v].start,true);
    player.playVideo();
  }
  $scope.switchSrc = function(id){
    if($scope.currentVideoId!=id){
      player.loadVideoById(id);
      $scope.currentVideoId = id;
    }
  }
});

app.controller('createCtrl', function($scope,$sce,$http){
  var tag2, firstScriptTag2, player2;
  tag2 = document.createElement('script');
  tag2.src = "https://www.youtube.com/iframe_api";
  firstScriptTag2 = document.getElementsByTagName('script')[0];
  firstScriptTag2.parentNode.insertBefore(tag2, firstScriptTag2);
  $scope.loaded = false;
  $scope.arr = [];
  function isInteger(n) {
    return (typeof n == 'number' && /^-?\d+$/.test(n+''));
  }
  $scope.isDisabled = function(){
    return !$scope.loaded;
  }
  $scope.addObj = function(){
    var c,s,e;
    c = $('#contextt').val();
    s = parseInt( $('#startmin').val()*60)+parseInt($('#startsec').val() );
    e = parseInt(($('#endmin').val()*60)+parseInt($('#endsec').val()));
    if(isNaN(s) || isNaN(e)){
      alert('Complete all fields')
      return;
    }
    if(parseInt($('#startsec').val())>59 || parseInt($('#endsec').val())>59 ){
      alert('Seconds cannot be greater than 59');
      return;
    }
    if(c.length < 1){
      alert('Complete context field');
      return;
    }
    $scope.arr.push({
      context:c,
      start:s,
      end:e
    })
  }
  $scope.loadvid = function(){
    var inter = setInterval(function(){ 
    if(typeof YT != 'undefined'){
      if(typeof player.c == 'undefined'){
        player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: $('#videoidd').val(),
        playerVars: {
          autoPlay: 0
        }
       });
      }else{
        player.loadVideoById($('#videoidd').val());
      }
     clearInterval(inter)
    }
    }, 500);
    $scope.loaded = true;
  }
  $scope.removeObj = function(i){
    $scope.arr.splice(i,1)
  }
  $scope.playObj = function(v){
    player.seekTo($scope.arr[v].start,true);
    player.playVideo();
  }
  $scope.createTLDW = function(){
    $http.post('/api/tldw', {
      title: "title",
      videoId: "id",
      highlights:$scope.arr
    }).then(function(data){
      console.log(data.data)
    });
  }
});

})();  
