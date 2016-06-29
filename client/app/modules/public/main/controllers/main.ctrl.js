/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.main')
    .controller('MainCtrl', function ($state) {
      this.feedPosts = [
        {
          title: "feed section title",
          posts: [
            {
              content: "some post content 1"
            },
            {
              content: "some post content 2"
            }
          ]
        },
        {
          title: "feed section title",
          posts: [
            {
              content: "some post content 3"
            },
            {
              content: "some post content 4"
            }
          ]
        }
      ]
    });


})();
