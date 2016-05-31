var myApp = angular.module('myApp', []);

myApp.controller('PetController', ['$scope', '$http', function($scope, $http) {
  var key = '4ab716efd563ffcbe232408375fb1c5b';
  var baseURL = 'http://api.petfinder.com/';
  $scope.count = 0;
  $scope.favoriteArray = [];
  $scope.animal = {};
  $scope.favoritePet = {};
  $scope.pets = [{
    id: 1,
    label: 'Dogs',
    value: 'dog'
  }, {
    id: 2,
    label: 'Cats',
    value: 'cat'
  }];
getFavorite();
  $scope.getRandomPet = function(pet) {
    var query = 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + pet.value;
    query += '&output=basic';
    query += '&format=json';

    var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';

    console.log(request);

    $http.jsonp(request).then(
      function(response) {
        console.log(response.data);
        $scope.animal = response.data.petfinder.pet;
        $scope.breed = $scope.animal.animal.$t;
      }
    )
  }

$scope.setFavorite = function () {
  $scope.count++;
  $scope.favoritePet.animal = $scope.animal.animal.$t;
  $scope.favoritePet.description = $scope.animal.description.$t;
  $scope.favoritePet.id = $scope.animal.id.$t;
  $scope.favoritePet.photo = $scope.animal.media.photos.photo[3].$t;
  $scope.favoritePet.name = $scope.animal.name.$t;
  console.log($scope.favoritePet);
  $http.post('/favPets', $scope.favoritePet)
  .then(function (){
    console.log('POST /favPets');
  })
}

function getFavorite () {
  
  $http.get('/favPets')
      .then(function (response) {
        $scope.favoriteArray = response.data;
        console.log('GET /favPets ', response.data);
        $scope.count = $scope.favoriteArray.length;
      });
}

}]);
