/**
 * Created by yotam on 27/06/2016.
 */
(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .controller('editPostCtrl', function ($state, PostsService, post, categories, mks, committees) {
      console.log(post);
      this.post = post;
      this.mks = mks;
      this.categories = categories;
      this.committees = committees;

      this.formFields = PostsService.getFormFields();
      this.formOptions = {};
      this.tinymceOptions = {
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
      };
      /*            this.selectedCategories = [
       {
       id :1,
       name : 'Beer'
       }
       ];*/
      /*            this.categories = [
       {
       id :1,
       name : 'Category 1',
       },
       {
       id : 2,
       name : 'Category 2',
       }
       ];*/

      this.submit = function () {
        // TODO bulk update committee members,categories and committees.
        PostsService.upsertPost(this.post).then(function () {
          $state.go('^.list');
        });
      };
    });


})();
