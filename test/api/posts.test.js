/**
 * Created by yotam on 28/06/2016.
 */

var config = require('../config');
var assert = require('assert');
var supertest = require('supertest');
var status = require('http-status');
var authorization = "";

describe('/posts', function () {
  it('login as a user', function (done) {

    supertest(app).post(config.apiPrefix + '/users/login')
      .type('form')
      .send({
        email: "user@user.com",
        password: "user"
      })
      .end(function (err, res) {
        console.log(JSON.stringify(res.body));
        assert.equal(res.status, status.OK);
        done();
      });
  });

  describe('with user session', function () {

    it('Non admin user - should fail to create a post', function (done) {

      supertest(app).post(config.apiPrefix + '/posts').end(function (err, res) {
        assert.equal(res.status, status.UNAUTHORIZED);
        done();
      });
    });

    it('Non admin user - should fail to update a post', function (done) {

      supertest(app).put(config.apiPrefix + '/posts', {}).end(function (err, res) {
        assert.equal(res.status, status.UNAUTHORIZED);
        done();
      });
    });

    it('Non admin user - should fail to delete a post', function (done) {

      supertest(app).delete(config.apiPrefix + '/posts/1', {}).end(function (err, res) {
        assert.equal(res.status, status.UNAUTHORIZED);
        done();
      });
    });

    it(' should get all posts', function (done) {

      supertest(app).get(config.apiPrefix + '/posts').end(function (err, res) {
        assert.equal(res.status, status.OK);
        done();
      });

      supertest(app).post(config.apiPrefix + '/posts', {}).end(function (err, res) {
        assert.equal(res.status, status.BAD_REQUEST);
        done();
      });
    });
  });


  it(' should login as admin', function (done) {

    supertest(app).post(config.apiPrefix + '/users/login')
      .type('form')
      .send({
        email: "admin@admin.com",
        password: "admin"
      })
      .end(function (err, res) {
        authorization = res.body.id;
        console.log(JSON.stringify(res.body));
        assert.equal(res.status, status.OK);
        done();
      });
  });
  describe('with user session', function () {
    it('admin user - should be able to create a post', function (done) {

      supertest(app).post(config.apiPrefix + '/posts')
        .type('form')
        .set('authorization', authorization)
        .send({
          title: "some title"
        })
        .end(function (err, res) {
          assert.equal(res.status, status.OK);
          done();
        });
    });
  });



});
