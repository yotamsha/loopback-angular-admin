/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .controller('addPostCtrl', function ($state, PostsService, post, categories) {
      this.post = post;
      this.categories = categories;
      this.formFields = PostsService.getFormFields();
      this.formOptions = {};
      this.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      };

      this.submit = function () {
        PostsService.upsertPost(this.post).then(function () {
          $state.go('^.list');
        });
      };
    });


})();
