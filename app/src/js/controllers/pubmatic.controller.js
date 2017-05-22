/**
 * Main controller
 * @memberof ng-app pubmatic
 * @description
 *   queries for updates in realtime.
 *   1)return array sorted by last updated.
 *   2)return array sorted by last executed.
 *   3)user can customise returned array size.
 *   4)user can customise tags for filtering.
 */
app.controller('PubmaticController', [
    '$scope', 'getsortedService',
    function($scope, getsortedService) {
        $scope.arraySortedByUpdated = [];
        $scope.arraySortedByExecuted = [];
        $scope.sizeUpdated = 0;
        $scope.sizeExecuted = 0;
        $scope.tagUpdated = '';
        $scope.tagExecuted = '';

        /*
        @name
            startPolling
        @description
            updates in realtime
        */
        $scope.startPolling = function() {
            getsortedService.startPolling();
        }

        /*
        @name
            getUpdated
        @description
            get array sorted by last updated time
        */
        $scope.getUpdated = function() {
            //validation, could do more work on that
            if ($scope.sizeUpdated < 0) {
                window.alert("please enter a size greater than 0")
            } else {
                $scope.arraySortedByUpdated = getsortedService.queryUpdates($scope.sizeUpdated, $scope.tagUpdated).arraySortedByUpdate;
            }
        }

        /*
        @name
            getExecuted
        @description
            get array by last executed time
        */
        $scope.getExecuted = function() {
            if ($scope.sizeExecuted < 0) {
                window.alert("please enter a size greater than 0")
            } else {
                $scope.arraySortedByExecuted = getsortedService.queryUpdates($scope.sizeExecuted, $scope.tagExecuted).arraySortedByExecuted;
            }
        }
    }
])
