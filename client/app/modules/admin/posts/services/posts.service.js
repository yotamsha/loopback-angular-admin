(function () {
  'use strict';
  angular
    .module('com.module.posts')
    .service('PostsService', function (CoreService, Post, gettextCatalog) {
      this.getPosts = function (filtersObj) {
        var filters = filtersObj || {
            include: ['categories'],
            order: 'updatedAt DESC'
          };
        return Post.find({
          filter: filters
        }).$promise;
      };

      this.getPost = function (id) {
        return Post.findById({
            id: id,
            filter : {
              include: ['categories']
            }
          }
        ).$promise;
      };

      this.getPostByParams = function (filterObj) {
        var filter = filterObj || {};

        return Post.findOne({
            filter : filter
          }
        ).$promise;
      };
      
      this.upsertPost = function (post) {
        //return Post.categories.link({ id: post.id, fk: '2' }).$promise;
        return Post.upsert(post).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Post saved'),
              gettextCatalog.getString('Your post is safe with us!')
            );
          })
          .catch(function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error saving post '),
                gettextCatalog.getString('This post could no be saved: ') + err
              );
            }
          );
      };

      this.deletePost = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Post.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Post deleted'),
                gettextCatalog.getString('Your post is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting post'),
                gettextCatalog.getString('Your post is not deleted! ') + err);
              cancelCb();
            });
          },
          function () {
            cancelCb();
          }
        );
      };

      this.getFormFields = function () {
        return [
          {
            key: 'title',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Title'),
              required: true
            }
          },
          {
            key: 'subtitle',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Subtitle'),
              required: true
            }
          },
          {
            key: 'permaLink',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Permalink')
            }
          },
          {
            key: 'meetingDate',
            type: 'datepicker',
            templateOptions: {
              label: gettextCatalog.getString('Committee Meeting Date')
            }
          },
          /*          {
           key: 'content',
           type: 'textarea',
           templateOptions: {
           label: gettextCatalog.getString('Content'),
           required: true
           }
           },*/
          {
            key: 'mainImage',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Main Image')
            }
          },
          {
            key: 'featuredImage',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Featured Image')
            }
          },
          {
            key: 'fbImage',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Facebook Image')
            }
          },
          {
            key: 'status',
            type: 'select',
            templateOptions: {
              label: gettextCatalog.getString('Status'),
              options: [
                {
                  'name': 'Draft',
                  'value': 'DRAFT'
                },
                {
                  'name': 'Pending Review',
                  'value': 'PENDING_REVIEW'
                },
                {
                  'name': 'Published',
                  'value': 'PUBLISHED'
                },
              ]
            },
            hideExpression: '!model.status'

          },


        ];
      };

    });

})();
