module.exports = function(fozy) {
  return async function(ctx, next) {
    ctx.set('x-frame-options', 'sameorigin');
    await next();
  }
}