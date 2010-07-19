(function($) {
    $.extend({
        meme: {
            search: function(params, callback) {
                var query = 'SELECT * FROM meme.search(' + params.count + ') WHERE query="' + params.query + '"';
                this.query_yql(query, callback);
            },
            query_yql: function(query, callback) {
                var asynchronous = callback != null;
                $.ajax({
                    url: "http://query.yahooapis.com/v1/public/yql",
                    dataType: "jsonp",
                    success: callback,
                    async: asynchronous,
                    data: {
                        q: query,
                        format: "json",
                        env: 'store://datatables.org/alltableswithkeys',
                        callback: "?"
                    }
                });
            }
        }
    });
})(jQuery);
