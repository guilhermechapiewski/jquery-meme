module("Meme Unit");

var original_query_yql = $.meme.query_yql;
var reset = function() {
    $.meme.query_yql = original_query_yql;
}

test('It should return expected result when searching for only one post', function() {
    expect(3);
    
    $.meme.query_yql = function(query, callback) {
        equal(query, 'SELECT * FROM meme.search(1) WHERE query="meme rocks"');
        
        var data_mock = Array();
        data_mock[0] = { caption:'blah' };
        callback(data_mock);
    }
    
    $.meme.search({ query:'meme rocks', count:1 }, function(data) {
        equal(data.length, 1);
        equal(data[0].caption, 'blah');
    });
    
    reset();
});