/**
 * Created by yotam on 28/06/2016.
 */

var config = require('../config');
var assert = require('assert');
var supertest = require('supertest');
var status = require('http-status');


describe('/posts', function () {

  it('Non admin user - should fail to create a post', function (done) {

    supertest(app).post(config.apiPrefix + '/posts', {}).end(function (err, res) {
      //assert.ifError(err);
      assert.equal(res.status, status.UNAUTHORIZED);
      done();
    });
  });

  it('Non admin user - should fail to update a post', function (done) {

    supertest(app).put(config.apiPrefix + '/posts', {}).end(function (err, res) {
      //assert.ifError(err);
      assert.equal(res.status, status.UNAUTHORIZED);
      done();
    });
  });

  it('Non admin user - should fail to delete a post', function (done) {

    supertest(app).delete(config.apiPrefix + '/posts/1', {}).end(function (err, res) {
      //assert.ifError(err);
      assert.equal(res.status, status.UNAUTHORIZED);
      done();
    });
  });
  
  it(' should get all posts', function (done) {

    supertest(app).get(config.apiPrefix + '/posts').end(function (err, res) {
      assert.equal(res.status, status.OK);
/*      var result = JSON.parse(res.text);
      assert.deepEqual(result.length, 1);*/
      done();
    });

    supertest(app).post(config.apiPrefix + '/posts', {}).end(function (err, res) {
      //assert.ifError(err);
      assert.equal(res.status, status.BAD_REQUEST);
      done();
    });
  });


});
