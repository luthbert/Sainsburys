'use strict'
var app = require("./app");

app.controller("flickrFavouritesCtrl", ["$scope", "$window", "$sessionStorage", function ($scope, $window, $sessionStorage) {

    $scope.storage = $sessionStorage;
    $scope.images = $window.flickrItems.data;

    $scope.selectedImages = $scope.storage.selectedImages || [];
    $scope.favourites = $scope.selectedImages.slice();

    var watch = window.flickrItems.watch(function (newValue) {
        $scope.images = newValue;
        $scope.$apply();
    });

    angular.element($window).on("unload", function () {
        $scope.storage.selectedImages = $scope.selectedImages;
        $scope.storage.$apply();
    });

    $scope.$on("destroy", function () {
        watch.unwatch();
    })

    $scope.imageClick = function (id) {
        var indexOf = $scope.selectedImages.indexOf(id);
        if (indexOf == -1) {
            $scope.selectedImages.push(id);
            return;
        }
        $scope.selectedImages.splice(indexOf, 1);
    }
}]);