import React from "react";
import { styled } from "styled-components";

const BtnStyling = styled.button`
  border: 2px solid white;
  width: 200px;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 10px;
  padding: 8px 0px;
  transition: all 0.8s ease-in-out;
  margin: 0px 10px 10px 10px;
  &:hover {
    border-radius: 10px;
    background-color: white;
    color: #032248;
  }
`;

const LedgerButton = ({ title, onClick }) => {
  return (
    <BtnStyling className="select-none" onClick={onClick}>
      {title}
    </BtnStyling>
  );
};

export default LedgerButton;
