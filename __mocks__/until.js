const extend = require("lodash").extend;

let success = {
  code: 0,
  success: "true",
  result: {},
};

let fail = {
  code: 2,
  message: "系统繁忙",
};

function end(res, data) {
  setTimeout(() => {
    res.end(JSON.stringify(extend(success, data)));
  }, 800);
}

function endFail(res, data) {
  setTimeout(() => {
    res.end(JSON.stringify(extend(fail, data)));
  }, 800);
}

const res = {
  ok: function (req, res, obj) {
    end(res, { result: obj || {} });
  },
  fail: function (req, res, obj) {
    endFail(res, { result: obj || {} });
  },
};

module.exports = res;
