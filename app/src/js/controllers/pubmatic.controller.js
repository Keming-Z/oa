app.controller('PubmaticController', [
    '$scope', 'getsortedService',
    function($scope, getsortedService) {
        $scope.arraySortedByUpdate = [];
        $scope.arraySortedByExecuted = [];
        $scope.size = 0;
        $scope.tag = '';

        //Long polling for updating in real time
        getsortedService.startPolling();

        $scope.init = function() {
            getsortedService.initData().then(function(res) {
                $scope.arraySortedByUpdate = res.arraySortedByUpdate;
                $scope.arraySortedByExecuted = res.arraySortedByExecuted;
            })
        }

        $scope.getUpdates = function() {
            //validation, could do more work on that
            if($scope.size < 0) {
                window.alert("please enter a size greater than 0")
            } else {
                $scope.arraySortedByUpdate = getsortedService.queryUpdates($scope.size, $scope.tag).arraySortedByUpdate;
                $scope.arraySortedByExecuted = getsortedService.queryUpdates($scope.size, $scope.tag).arraySortedByExecuted;
            }
        }
    }
])
