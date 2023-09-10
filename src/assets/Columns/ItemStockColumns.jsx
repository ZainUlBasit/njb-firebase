export const StockColumns = [
  {
    id: "name",
    label: " Name",
    minWidth: 190,
    align: "left",
  },
  {
    id: "purchase",
    label: "Purchase",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "qty",
    label: "Quantity",
    minWidth: 150,
    align: "right",
  },
  {
    id: "desc",
    label: "Description",
    minWidth: 100,
    align: "right",
  },
  {
    id: "invoice",
    label: "Invoice #",
    minWidth: 100,
    align: "right",
  },
  {
    id: "truck",
    label: "Truck #",
    minWidth: 100,
    align: "right",
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
    align: "right",
  },
];
