export const ExpenseColumns = [
  {
    id: "date",
    label: "Date",
    minWidth: 110,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "desc",
    label: "Description",
    minWidth: 250,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "expense",
    label: "Expense",
    minWidth: 110,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];
