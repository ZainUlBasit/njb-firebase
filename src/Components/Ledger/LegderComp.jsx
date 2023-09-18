import styled from "styled-components";
import SelectComp from "../Select/SelectComp";
import DatePickerComp from "../DatePicker/DatePicker";
import LedgerButton from "../Buttons/LedgerButton";
import Select from "react-select";

export const ReportStyled = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  .InnerCont {
    width: 80%;
    background-color: #032248;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
      rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
    border: 2px solid white;
    .TitleCont {
      color: white;
      font-family: raleway;
      font-weight: 700;
      font-size: 2.3em;
      padding: 20px 0px 10px 0px;
      text-align: center;
      letter-spacing: 0.05ch;
      @media screen and (max-width: 466px) {
        letter-spacing: 0.1ch;
        font-size: 1.5em;
      }
    }
    .Line {
      width: 100%;
      height: 2px;
      background-color: white;
    }
    .ButtonCont {
      margin-bottom: 10px;
    }
  }
`;

const InputWrapperStyling = styled.div`
  /* <div className="w-[100%] flex justify-center items-center"> */
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  /* className="h-full px-[8px] py-[8px] rounded-[5px] font-[raleway] placeholder:text-gray-600 outline-none text-[.9rem] font-[700] w-[95%]" */
  .dropdown {
    position: absolute;
    top: 100%;
    left: 2.5%;
    width: 95%;
    height: 0px;
    background-color: #dddbdb;
    z-index: 30;
  }

  & input:focus .dropdown {
    height: 100%;
  }

  & > input {
    width: 95%;
    height: 100%;
    font-size: 1.2rem;
    font-family: "raleway" !important;
    font-weight: 700;
    padding: 10px 8px;
    border-radius: 5px;
    outline: none;
    color: #032248;
    &::placeholder {
      font-weight: 400;
      color: #808080b1;
    }
  }
  @media (max-width: 466px) {
    & > input {
      font-size: 0.95rem;
    }
  }
`;

const LedgerComp = (props) => {
  return (
    <ReportStyled>
      <div className="InnerCont">
        <div className="TitleCont select-none">{props.title}</div>
        <div className="Line"></div>
        <InputWrapperStyling>
          <Select
            options={props.Options.map((opt) => {
              return {
                label: opt.name,
                value: opt._id,
              };
            })}
            className="w-[95%] my-[20px] pb-[0px] font-bold"
            onChange={(opt) => props.setSelectCompany({ id: opt.value.toString(), found: true })}
          />
        </InputWrapperStyling>
        <div className="pr-[10px] pl-[10px] font-[raleway] flex w-[100%] rounded-[10px] justify-between mt-[12px] mb-[28px] sm:flex-wrap md:flex-nowrap">
          <DatePickerComp
            title={"From Date"}
            value={props.fromDate}
            onChange={props.onChange}
          />
          <div className="w-[30%]"></div>
          <DatePickerComp
            title={"To Date"}
            value={props.toDate}
            onChange={props.onChange1}
          />
        </div>
        <div className={props.Invoice ? "ButtonCont mt-[20px]" : "ButtonCont"}>
          <div className="flex justify-center items-center flex-wrap">
            <LedgerButton
              title={"SHOW CASH LEDGER"}
              onClick={props.handleCash}
            />
            <LedgerButton
              title={"SHOW ITEM LEDGER"}
              onClick={props.handleItem}
            />
          </div>
        </div>
      </div>
    </ReportStyled>
  );
};

export default LedgerComp;
