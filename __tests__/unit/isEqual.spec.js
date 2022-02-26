import { isEqual } from "@/common/until";

describe("isEqual 方法测试number", () => {
  test("1===1", () => {
    expect(isEqual(1, 1)).toBe(true);
  });
});
