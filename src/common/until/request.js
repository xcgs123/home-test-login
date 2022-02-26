//请求封装，报错统一
import axios from "axios";

export const post = async function (url = "", data = {}) {
  try {
    const res = await axios.post(url, {
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};
