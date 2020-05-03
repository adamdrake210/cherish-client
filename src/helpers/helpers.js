function sortLastName(array) {
  return array.sort((a, b) => {
    if (a.lastName > b.lastName) {
      return 1;
    }
    if (b.lastName > a.lastName) {
      return -1;
    }
    return 0;
  });
}

export default sortLastName;
