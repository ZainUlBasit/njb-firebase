export const CustomerItemLedgerColumns = [
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "bill",
    label: "Bill#",
    minWidth: 190,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "name",
    label: "Name",
    minWidth: 150,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "qty",
    label: "Qty",
    minWidth: 100,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "Price",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
