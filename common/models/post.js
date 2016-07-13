'use strict';
var _ = require('lodash');
module.exports = function (Post, app) {

  Post.observe('after save', function (ctx, next) {

    function updateRelatedItems(PostModel, relatedItems) {


      function removeObjects(array){
        var requests = [];
        for (var i = 0; i < array.length; i++){
          requests.push(PostModel.categories.remove(array[i]));
        }
        console.log("removing object ids: " + array);
        return Promise.all(requests);
      }
      function addObjects(array){
        var requests = [];
        for (var i = 0; i < array.length; i++){
          requests.push(PostModel.categories.add(array[i]));
        }
        console.log("adding object ids: " + array);
        return Promise.all(requests);
      }


      /**
       *
       * @returns {Promise} - resolved with an object which includes ids to link and ids to unlink from parent model.
       * @param PostModel
         */
      function getValuesToUpdate(){
        return new Promise(function(resolve, reject){
          // get current categories for the post
          PostModel.categories(function(err, existingItems){
            if (err){
              reject(err);
            }
            // get all ids from the new relatedItems list.
            var idsToAdd = _.map(relatedItems, 'id');
            var existingIds = _.map(existingItems, 'id');
            // get all items that appear in the new relatedItems list and not in the existingItems.
            var idsToRemove = _.difference(existingIds, idsToAdd );
            resolve({idsToAdd :idsToAdd,idsToRemove : idsToRemove });

          });
        });

      }

      /**
       *
       * @param removeArr - ids to unlink from parent.
       * @param addArr - ids to link to parent.
       * @returns {*}
         */
      function updateRelations(removeArr, addArr){
        return removeObjects(removeArr).then(function(){
          return addObjects(addArr)
        });
      }

      getValuesToUpdate().then(function(valuesToUpdate){
        updateRelations(valuesToUpdate.idsToRemove , valuesToUpdate.idsToAdd).then(function(){
          next();
        });
      });

    }

    var categoriesToSet = [];
    // TODO generalize this and add into app-model to expose to other models who have hasMany relations
    if (ctx.instance) {
      categoriesToSet = ctx.instance.__categories__;
      updateRelatedItems(ctx.instance, categoriesToSet);
    } else {
      categoriesToSet = ctx.data.__categories__;
      updateRelatedItems(ctx.currentInstance, categoriesToSet)

    }

  });

  Post.createFakeData = function (faker) {
    return Post.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      image: faker.image.imageUrl() + '/nature/' + (Math.random() * 9 | 0)
    });
  };

};
