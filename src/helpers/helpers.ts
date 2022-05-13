export function sortLastName(array: Array<any>) {
  return array.sort((a, b) => {
    if (a.data().lastName > b.data().lastName) {
      return 1;
    }
    if (b.data().lastName > a.data().lastName) {
      return -1;
    }
    return 0;
  });
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFirstLetter = (word: string) => word?.charAt(0).toUpperCase();
