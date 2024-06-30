import axios from "axios";

export const Fetch = async (url, sendData = {}) => {
  let str = "";
  if (sendData)
    for (let item in sendData)
      str += `${item}=${sendData[item]}&`;
  str.slice(0, -1);
  return await axios.get(`${url}?${str}`, {
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 60000,
  });
};
export const Post = async (url, sendData = {}) => {
  const apiToken = process.env.API_TOKEN ?? "";
  return await axios.post(url, sendData, {
    headers: {
      "Content-Type": "application/json",
      "X-TOKEN": apiToken,
    },
    timeout: 60000,
  });
};
