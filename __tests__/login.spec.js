import { mount } from "@vue/test-utils";
import Login from "@/views/Login";

describe("<Login/>", () => {
  it("没有输入, 提交失败", async () => {
    const wrapper = mount(Login);

    await wrapper.find("button").trigger("click");
    expect(wrapper.vm.$data.submitError).toEqual("校验失败");
  });
});
