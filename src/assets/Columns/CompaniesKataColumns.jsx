export const CompaniesKataColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
  },
  {
    id: "desc",
    label: "Description",
    minWidth: 100,
  },
  {
    id: "total",
    label: "Total Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "paid",
    label: "Paid Amount",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "remaining",
    label: "Remaining Amount",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
