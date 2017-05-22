app.service('getsortedService', getsortedService);

function getsortedService($http, $interval) {
    const MINUTE = 60000;
    var arrayUnsorted = [];
    var arraySortedByUpdate = [];
    var arraySortedByExecuted = [];

    var service = {
        initData: initData,
        queryUpdates: queryUpdates,
        startPolling: startPolling
    };
    return service;

    function getArray() {
        var promise = $http.get('../../data/test.json').then(function(res) {
            arrayUnsorted = res.data;
        })
        return promise;
    }

    function sortArray() {
        var promise = getArray().then(function() {
            arraySortedByUpdate = arrayUnsorted.slice();
            arraySortedByUpdate.sort(function(a, b) {
                return new Date(b.datetimes.updated) - new Date(a.datetimes.updated)
            })
            arraySortedByExecuted = arrayUnsorted.slice();
            arraySortedByExecuted.sort(function(a, b) {
                return new Date(b.datetimes["last executed"]) - new Date(a.datetimes["last executed"])
            })
        })
        return promise;
    }

    function initData() {
        return sortArray().then(function() {
            return {
                "arraySortedByUpdate": arraySortedByUpdate,
                "arraySortedByExecuted": arraySortedByExecuted
            }
        })
    }

    function startPolling() {
        var intervalID = $interval(sortArray, MINUTE);
    }

    function stopPolling() {
        $interval.cancel(intervalID);
    }

    function queryUpdates(size, tag) {
        var resizeUpdate = arraySortedByUpdate.slice(0, +size);
        var resizeExecuted = arraySortedByExecuted.slice(0, +size);
        if(tag === '') {
            return {
                "arraySortedByUpdate": resizeUpdate,
                "arraySortedByExecuted": resizeExecuted
            }
        } else {
            var filterUpdate = resizeUpdate.filter(function(elem) {
                return elem.tags.indexOf(tag) >= 0;
            })
            var filterExecuted = resizeExecuted.filter(function(elem) {
                return elem.tags.indexOf(tag) >= 0;
            })
            return {
                "arraySortedByUpdate": filterUpdate,
                "arraySortedByExecuted": filterExecuted
            }
        }

    }
}
