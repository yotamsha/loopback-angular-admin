(function () {
  'use strict';
  angular
    .module('com.module.categories')
    .service('CategoriesService', function (CoreService, Category, gettextCatalog) {

      this.getCategories = function () {
        return Category.find({
          filter: {
            order: 'name ASC',
          }
        }).$promise;
      };

      this.getCategory = function (id, filterObj) {
        var filter = filterObj || {};
        return Category.findById({
            id: id,
            filter : filter
          }
        ).$promise;

      };
      this.getCategoryByParams = function (filterObj) {
        var filter = filterObj || {};

        return Category.findOne({
            filter : filter
          }
        ).$promise;

      };


      this.upsertCategory = function (category) {
        return Category.upsert(category).$promise
          .then(function () {
            CoreService.toastSuccess(
              gettextCatalog.getString('Category saved'),
              gettextCatalog.getString('Your category is safe with us!')
            );
          })
          .catch(function (err) {
            CoreService.toastError(
              gettextCatalog.getString('Error saving category '),
              gettextCatalog.getString('This category could no be saved: ') + err
            );
          }
        );
      };

      this.deleteCategory = function (id, successCb, cancelCb) {
        CoreService.confirm(
          gettextCatalog.getString('Are you sure?'),
          gettextCatalog.getString('Deleting this cannot be undone'),
          function () {
            Category.deleteById({id: id}, function () {
              CoreService.toastSuccess(
                gettextCatalog.getString('Category deleted'),
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
