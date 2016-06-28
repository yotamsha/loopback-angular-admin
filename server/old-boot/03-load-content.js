'use strict';

// to enable these logs set `DEBUG=boot:03-load-content` or `DEBUG=boot:*`
var log = require('debug')('boot:03-load-content');

module.exports = function (app) {

  if ((app.dataSources.db.name !== 'Memory' && !process.env.INITDB) || process.env.DB_MIGRATION) {
    return;
  }
  log('Creating categories and products');

  var Category = app.models.Category;
  var Post = app.models.Post;

  Category.findOrCreate(
    {where: {name: 'Beer'}}, // find
    {name: 'Beer'}, // create
    function (err, category, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Category', category.name)
        : log('found Category', category.name);
    });
  var post = {title : 'Post title',content: 'Content1'};

  Post.findOrCreate(null,post,
    function (err) {
      if (err) {
        console.error('err', err);
      }
    });
/*  Category.findOrCreate({where: {name: 'Wine'}}, {
    name: 'Wine'
  }, function (err, category, created) {
    if (err) {
      console.error('err', err);
    }
    (created) ? log('created Category', category.name)
      : log('found Category', category.name);
    Product.findOrCreate({where: {name: 'Red wine'}}, {
      name: 'Red wine',
      price: '350',
      categoryId: category.id
    }, function (err, data, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Product', data.name)
        : log('found Product', data.name);
    });
    Product.findOrCreate({where: {name: 'White wine'}}, {
      name: 'White wine',
      price: '350',
      categoryId: category.id
    }, function (err, data, created) {
      if (err) {
        console.error('err', err);
      }
      (created) ? log('created Product', data.name)
        : log('found Product', data.name);
    });
  });*/

};
