/**
 * Get sorted array service
 * @memberof PubmaticController
 * @description
 *   fetch data in real time and store locally.
 *   return arrays according to user's requirements
 */
app.service('getsortedService', [
    '$http', '$interval', 'sortService', 'filterService',
    function($http, $interval, sortService, filterService) {
        //private
        const MINUTE = 60000;
        var arrayUnsorted = [];
        var intervalID;

        //export functions
        var service = {
            queryUpdates: queryUpdates,
            startPolling: startPolling
        };
        return service;

        /*
        @name
            getArray
        @description
            $http gets data from API(/bidconfig) .
        @return {promise}
            promise returned by $http.get().then()
        */
        function getArray() {
            var promise = $http.get('../../data/test.json').then(function(res) {
                arrayUnsorted = res.data;
            })
            return promise;
        }

        /*
        @name
            startPolling
        @description
            Polling every minute, make raw data updates in real time. Create intervalID for canceling.
        */
        function startPolling() {
            getArray();
            intervalID = $interval(getArray, MINUTE);
        }
        // function stopPolling() {
        //     $interval.cancel(intervalID);
        // }

        /*
        @name
            queryUpdates
        @description
            return sorted arrays in "size", and filtered by "tag"
        @param {string, string}
            customed size and tag
        @return {object}
            object containing two arrays
        */
        function queryUpdates(size, tag) {
            //calling sortService to do sorting
            var arraySorted = sortService.sortArray(arrayUnsorted);

            var resizeUpdate = arraySorted.arraySortedByUpdate.slice(0, +size);
            var resizeExecuted = arraySorted.arraySortedByExecuted.slice(0, +size);
            if (tag === '') {
                return {
                    "arraySortedByUpdate": resizeUpdate,
                    "arraySortedByExecuted": resizeExecuted
                }
            } else {
                //calling filterService to do filter
                var arrayFiltered = filterService.filterArray(resizeUpdate, resizeExecuted, tag);
                return {
                    "arraySortedByUpdate": arrayFiltered.filterUpdate,
                    "arraySortedByExecuted": arrayFiltered.filterExecuted
                }
            }

        }

        // function initData() {
        //     var promise = sortArray().then(function() {
        //         return {
        //             "arraySortedByUpdate": arraySortedByUpdate,
        //             "arraySortedByExecuted": arraySortedByExecuted
        //         }
        //     })
        //     return promise;
        // }
    }
]);
