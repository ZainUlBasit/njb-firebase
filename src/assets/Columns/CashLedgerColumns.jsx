export const CashLedgerColumns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "depositor",
    label: "Depositor",
    minWidth: 190,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "accountno",
    label: "Acc #",
    minWidth: 150,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cnicno",
    label: "CNIC",
    minWidth: 100,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
