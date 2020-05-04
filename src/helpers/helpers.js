export function sortLastName(array) {
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

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
