"use strict";

import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

import PageSelector from "../src/components/PageSelector";

const requiredProps = {
  totalItems          : 1000,
  itemsPerPage        : 20,
};
describe("<PageSelector>", () => {
  it("should contain an unordered list", () => {
    const wrapper = shallow(<PageSelector/>);
    expect(wrapper.find("ul")).to.have.length(1);
  });
  it("should raise an event on onPageNumberChange when the page is changed with an argument for the page number", () => {
    const onChange = sinon.spy(),
          preventDefault = sinon.spy();
    const wrapper = shallow(<PageSelector {...requiredProps} onPageNumberChange={onChange}/>);
    wrapper.children().last().find("a").simulate("click", { preventDefault: preventDefault});
    expect(preventDefault).to.have.property("callCount", 1);
    expect(onChange).to.have.property("callCount", 1);
    expect(onChange.calledWith(50)).to.be.true;
  });

  describe("with 1000 items, 20 per page", () => {
    const wrapper = shallow(<PageSelector {...requiredProps}/>);
    it("should contain 8 li elements", () => {
      expect(wrapper.find("li")).to.have.length(8);
    });
    it("should default to page 1", () => {
      const activeButton = wrapper.children(".active").first();
      expect(activeButton.text()).to.equal("1");
    });
    it("shouldn't have a 'First' button", () => {
      const startButton = wrapper.children().first();
      expect(startButton.text()).to.not.equal("First");
    });
    it("should start with a left pointing arrow '«' button", () => {
      const startButton = wrapper.children().first();
      expect(startButton.text()).to.equal("«");
    });
    it("should end with a 'Last' button", () => {
      const endButton = wrapper.children().last();
      expect(endButton.text()).to.equal("Last");
    });
    it("should have a right pointing arrow '»' button as the second from the end", () => {
      const secondFromEndButton = wrapper.childAt(6);
      expect(secondFromEndButton.text()).to.equal("»");
    });
    it("should have buttons 1 to 5 in order", () => {
      expect(wrapper.text()).to.contain("12345");
    });
  });
});
