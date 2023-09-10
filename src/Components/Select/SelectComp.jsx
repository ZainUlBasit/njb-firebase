import React, { useState } from "react";
import { styled } from "styled-components";

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  .SelectInner {
    outline: none;
    width: 95%;
    border-radius: 5px;
    padding: 8px 5px;
    font-size: ${(props) => (props.font_Size ? "1rem" : "1rem")};
    font-weight: 700;
    color: #032248;
    option {
      width: 50% !important;
      font-size: ${(props) => (props.font_Size ? "1rem" : "1rem")};
      font-weight: 600;
      @media screen and (max-width: 500px) {
        font-size: 10px !important;
      }
    }
  }
`;

const SelectComp = ({ DefOption, Options, font_Size, setSelect }) => {
  return (
    <SelectWrapper font_Size>
      <select
        className="SelectInner"
        onChange={(e) => {
          console.log("e.target.value");
          console.log(e.target.value);
          setSelect({ id: e.target.value.toString(), found: true });
        }}
        defaultValue={DefOption}
      >
        <option disabled defaultValue={DefOption} key="none">
          {DefOption}
        </option>
        {Options.map((Comp, i) => {
          return (
            <option key={i} value={Comp._id}>
              {Comp.name || Comp.itemname}
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default SelectComp;
