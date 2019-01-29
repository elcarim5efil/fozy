module.exports = function isPage(ctx) {
  let result = false;
  if (String(ctx.method).toLowerCase() !== 'get') {
    return false;
  }
  fozy.config.pages.some((page) => {
    const url = ctx.url.split('?')[0];
    const pageUrl = page.url.split('?')[0];
    if (pageUrl === url) {
      result = true;
      return true;
    }
    return false;
  });
  return result;
}
