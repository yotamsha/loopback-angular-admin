module.exports = function (AppModel) {
  AppModel.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.isNewInstance){
      if (ctx.instance) {
        ctx.instance.createdAt = new Date();
      } else {
        ctx.data.createdAt = new Date();
      }
    }
    if (ctx.instance) {
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });
};

