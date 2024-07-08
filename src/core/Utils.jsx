import { encode } from "html-entities";
export const addRemoveSlash = (
  value,
  before = false,
  after = false
) => {
  let result;
  if (before) {
    if (value.slice(0, 1) === "/") result = value;
    else result = "/" + value;
  } else {
    if (value.slice(0, 1) === "/") result = value.slice(1);
    else result = value;
  }
  if (after) {
    if (result.slice(-1) === "/") result = result;
    else result = result + "/";
  } else {
    if (result.slice(-1) === "/") result = result.slice(0, -1);
    else result = result;
  }
  return result;
};
export const toNumber = (input) => {
  try {
    const res = parseInt(input);
    return isNaN(res) ? 0 : res;
  } catch (err) {
    return 0;
  }
};

export const input = (value) => {
  try {
    if (!Array.isArray(value)) {
      if (typeof value === "string") return value.trim();
      else return "";
    } else return "";
  } catch (err) {
    return "";
  }
};
export const safeString = (str) => {
  try {
    return encode(str);
  } catch (err) {
    return "";
  }
};
export const Capitalize = (str) => {
  try {
    return str[0].toUpperCase() + str.substring(1)
  } catch (err) {
    return "";
  }

}