export const CustomerDetailColumns = [
  {
    id: "total",
    label: "Total",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cpaid",
    label: "Paid",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cdiscount",
    label: "Discount",
    minWidth: 190,
    align: "left",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "advance",
    label: "Advance",
    minWidth: 100,
    align: "right",
    // format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cloading",
    label: "Loading",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "cdelivery",
    label: "Delivery Charges",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
