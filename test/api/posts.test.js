/**
 * Created by yotam on 28/06/2016.
 */

var config = require('../config');
var assert = require('assert');
var supertest = require('supertest');
var status = require('http-status');


describe('/posts', function () {
  it('returns username if name param is a valid user', function (done) {

    supertest(app).get(config.apiPrefix + '/posts').end(function (err, res) {
      //assert.ifError(err);
      assert.equal(res.status, status.OK);
      var result = JSON.parse(res.text);
      assert.deepEqual(result.length, 1);
      done();
    });
  });
});
