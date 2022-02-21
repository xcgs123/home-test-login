/**
 * 校验规则信息
 */

/**
 * 邮箱校验
 */
export const emailRule = [
  {
    pattern: "^((\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*),?)*$",
    message: "邮箱格式错误",
    triggers: "change, input",
  },
];
