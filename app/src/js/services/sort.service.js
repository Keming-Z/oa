/**
 * Sort service
 * @memberof getsortedService
 * @description
 *   sort the raw data to sorted array
 *   consider of scalability, potential complexity, extract out and make a new service
 *   In reality it could be updating in difference of data. Data may be maintained in
 *   other structures with better algorithms, for example heap, to reduce time.
 */
app.service('sortService', sortService);

function sortService() {
    //export functions
    var service = {
        sortArray: sortArray
    }
    return service;

    /*
    @name
        sortArray
    @description
        sort array by updated time and executed time
    @param {array}
        unsorted array fetched from API
    @return {object}
        object containing two sorted arrays
    */
    function sortArray(arrayUnsorted) {
        var arraySortedByUpdate = arrayUnsorted.slice();
        arraySortedByUpdate.sort(function(a, b) {
            return new Date(b.datetimes.updated) - new Date(a.datetimes.updated)
        })
        var arraySortedByExecuted = arrayUnsorted.slice();
        arraySortedByExecuted.sort(function(a, b) {
            return new Date(b.datetimes["last executed"]) - new Date(a.datetimes["last executed"])
        })
        return {
            "arraySortedByUpdate": arraySortedByUpdate,
            "arraySortedByExecuted": arraySortedByExecuted
        }
    }
}
