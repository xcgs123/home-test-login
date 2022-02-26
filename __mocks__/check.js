var util = require("./until");
var Mock = require("mockjs");

const projectList = Mock.mock({
  name: "@cname",
  account: `@word`,
  phone: /1[3-9][0-9]{9}/,
  deptName: Mock.mock("@cword(2,4)"),
  id: "@guid",
});

module.exports = function (req, res) {
  util.ok(req, res, {
    msg: "成功",
    info: projectList,
  });
};
