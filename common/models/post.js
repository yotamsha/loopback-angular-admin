'use strict';

module.exports = function (Post) {

/*  Post.observe('before save', function (ctx, next) {

    function addCategories(categories){
      Post.categories.add(categories[0], function(err) {
        if (err){
          throw new Error(err);
        }
        console.log("Category Added");
        next();

      });
    }

    if (ctx.instance) {
      addCategories(ctx.instance.categories)
    } else {
      addCategories(ctx.data.categories)
    }
  });*/
  Post.createFakeData = function (faker) {
    return Post.create({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      image: faker.image.imageUrl() + '/nature/' + (Math.random() * 9 | 0)
    });
  };

};
