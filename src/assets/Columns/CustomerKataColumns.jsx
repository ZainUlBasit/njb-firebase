export const CustomerKataColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "advance",
    label: "Advance",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "total",
    label: "Total",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid",
    label: "Paid",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "discount",
    label: "Discount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remaining",
    label: "Remaining",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
