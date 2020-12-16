export default {

    createSearchFilter: function (queryString, search_param) {
        return (link) => {
            return (link[search_param].toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    },



}