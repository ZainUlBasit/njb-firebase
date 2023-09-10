export const CompaniesInfoColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 150,
  },
  {
    id: "desc",
    label: "Description",
    align: "right",
    minWidth: 100,
  },
  {
    id: "contact",
    label: "Contact",
    align: "right",
    minWidth: 135,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    align: "right",
    minWidth: 140,
    format: (value) => value.toLocaleString("en-US"),
  },
];
