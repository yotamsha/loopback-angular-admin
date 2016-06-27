(function () {
  'use strict';
  angular
    .module('com.module.committees')
    .service('CommitteesService', function (CoreService, Committee, gettextCatalog) {

      this.getCommittees = function () {
        return Committee.find({
          filter: {
            order: 'name ASC',
          }
        }).$promise;
      };

      this.getCommittee = function (id) {
        return Committee.findById({
            id: id
          }
        ).$promise;
      };

      this.upsertCommittee = function (category) {
        return Committee.upsert(category).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Committee saved'),
              gettextCatalog.getString('Your category is safe with us!')
            );
          })
          .catch(function (err) {
              CoreService.toastSuccess(
                gettextCatalog.getString('Error saving category '),
                gettextCatalog.getString('This category could no be saved: ') + err
              );
            }
          );
      };

      this.deleteCommittee = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Committee.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Committee deleted'),
                gettextCatalog.getString('Your category is deleted!'));
              successCb();
            }, function (err) {
              CoreService.toastError(
                gettextCatalog.getString('Error deleting category'),
                gettextCatalog.getString('Your category is not deleted! ') + err);
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
              label: gettextCatalog.getString('Name'),
              required: true
            }
          },
          {
            key: 'slug',
            type: 'input',
            templateOptions: {
              label: gettextCatalog.getString('Slug'),
              required: false
            }
          }
        ];
      };

    });

})();
