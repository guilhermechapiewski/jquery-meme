var original_query_yql = $.meme.query_yql;
var reset = function() {
    $.meme.query_yql = original_query_yql;
}

/*****************************************************************************/

module("Meme");
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

/*****************************************************************************/

asyncTest('It should fetch one post from YQL', function() {
    expect(2);
    
    $.meme.search({ query:'foobar', count:1 }, function(data) {
        equal(data.query.count, 1, 'should inform correct results count');
        ok(data.query.results.post.caption.indexOf('foobar') != -1, 'result should contain "foobar"');
        start();
    });
});

asyncTest('It should fetch many posts from YQL', function() {
    expect(3);
    
    $.meme.search({ query:'foobar', count:3 }, function(data) {
        equal(data.query.count, 3, 'should inform correct results count');
        equal(data.query.results.post.length, 3, 'should return 3 posts');
        ok(data.query.results.post[0].caption.indexOf('foobar') != -1, 'result should contain "foobar"');
        start();
    });
});