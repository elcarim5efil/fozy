export default function isPage(url) {
  let result = false;
  fozy.config.pages.some((page) => {
    if (page.url === url) {
      result = true;
      return true;
    }
    return false;
  });
  return result;
}

