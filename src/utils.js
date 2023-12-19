export function toTitleCase(str) {
  let words = str.split(' ');

  let titleCaseWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  let titleCaseStr = titleCaseWords.join(' ');

  return titleCaseStr;
}
