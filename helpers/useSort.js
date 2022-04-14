const useSort = (newArray) => {
  const sortedArray = newArray.sort(function(a, b) {
    let titleA = a.title.toUpperCase(); // ignore upper and lowercase
    let titleB = b.title.toUpperCase(); // ignore upper and lowercase
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return sortedArray
}

export default useSort