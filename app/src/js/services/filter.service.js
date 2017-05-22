/**
 * Filter service
 * @memberof getsortedService
 * @description
 *   filter array by tags
 *   consider of scalability, extract and make a new service
 */

app.service('filterService', filterService);

function filterService() {
    //export functions
    var service = {
        filterArray: filterArray
    }
    return service;

    /*
    @name
        filterArray
    @description
        filter array by tags
    @param {array, array, string}
        array sorted by update, array sorted by executed, tags for filtering
    @return {object}
        object containing two filtered arrays
    */
    function filterArray(resizeUpdate, resizeExecuted, tag) {
        var filterUpdate = resizeUpdate.filter(function(elem) {
            return elem.tags.indexOf(tag) >= 0;
        })
        var filterExecuted = resizeExecuted.filter(function(elem) {
            return elem.tags.indexOf(tag) >= 0;
        })
        return {
            "filterUpdate": filterUpdate,
            "filterExecuted": filterExecuted
        }
    }
}
