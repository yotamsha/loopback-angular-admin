(function () {
  'use strict';
  angular
    .module('com.module.mks')
    .service('MKsService', function (CoreService, MK, gettextCatalog) {

      this.getMKs = function () {
        return MK.find({
          filter: {
            order: 'name DESC'
          }
        }).$promise;
      };

      this.getMK = function (id) {
        return MK.findById({
            id: id
          }
        ).$promise;
      };

      this.upsertMK = function (mk) {
        //return Post.categories.link({ id: post.id, fk: '2' }).$promise;
        return MK.upsert(mk).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('MK saved'),
              gettextCatalog.getString('Your MK is safe with us!')
            );
          })
          .catch(function (err) {
              CoreService.toastSuccess(
                gettextCatalog.getString('Error saving mk '),
                gettextCatalog.getString('This MK could no be saved: ') + err
              );
            }
          );
      };

      this.deleteMK = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            MK.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('MK deleted'),
                gettextCatalog.getString('Your mk is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting mk'),
                gettextCatalog.getString('Your mk is not deleted! ') + err);
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
            key: 'name',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('name'),
              required: true
            }
          },
          {
            key: 'email',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('email'),
              required: true
            }
          },
          {
            key: 'image',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('image'),
              required: false
            }
          },


        ];
      };
    });

})();
