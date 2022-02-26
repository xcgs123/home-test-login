//请求封装，报错统一

export const post = async function (url = "", data = {}) {
  await fetch(url, {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  return new Promise((resolve) => {
    let data = {
      code: 1,
      mes: "error 啦！",
    };
    setTimeout(() => {
      resolve(data);
    }, 2000);
  });
};
