/**
 * This is the controller for index.html
 *
 * @author https: //github.com/lukemcfarlane
 * @date   March 2015 
 */
app.controller('MainCtrl', function($scope, $http) {
    $scope.isLoading = false;
    $scope.isSaving = false;
    $scope.isError = false;

    $scope.contacts = [];
    $scope.newContact = {
    };

    $scope.load = function() {
        $scope.isLoading = true;
        $http.get('/contacts').then(function(res) {
            console.log(res);
            if(res.status === 200) {
                $scope.contacts = res.data;
            } else {
                $scope.isError = true;
            }
            $scope.isLoading = false;
        }, function(err) {
            $scope.isError = true;
            console.log(err);
        });
    };

    $scope.save = function() {
        $scope.isSaving = true;
        $http.post('/contacts', $scope.newContact).then(function(res) {
            console.log('Received response: ', res);
            $scope.isSaving = false;
            $scope.load();
        }, function(err) {
            $scope.isError = true;
            console.log(err);
        });
        $scope.newContact = {};
    };

    $scope.load();
});