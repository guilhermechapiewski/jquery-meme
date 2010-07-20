module("Meme Acceptance");

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