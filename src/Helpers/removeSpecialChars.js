export const removeSpecialChars = (str) => {
  const charsMap = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (let char in charsMap) {
    const regex = charsMap[char];
    str = str.replace(regex, char);
  }

  return str;
};
