export const BankColumns = [
  {
    id: "bankname",
    label: "Bank Name",
    minWidth: "200px",
    align: "left",
  },
  {
    id: "accountno",
    label: "Account #",
    minWidth: "150px",
    align: "right",
  },
  {
    id: "amount",
    label: "Total Balance",
    minWidth: "150px",
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
