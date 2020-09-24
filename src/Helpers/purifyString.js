import { removeSpecialChars } from "Helpers/removeSpecialChars";

export const purifyString = (str) => {
  if (!str) {
    return false;
  }

  return removeSpecialChars(
    str.toLowerCase().replaceAll("-", "").replaceAll(" ", "")
  );
};
