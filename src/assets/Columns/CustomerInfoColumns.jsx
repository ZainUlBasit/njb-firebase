export const CustomerInfoColumns = [
  {
    id: "name",
    label: "Name",
    minWidth: 250,
  },
  {
    id: "cnic",
    label: "CNIC",
    minWidth: 155,
  },
  {
    id: "contact",
    label: "Contact",
    align: "left",
    minWidth: 135,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    align: "left",
    minWidth: 240,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    align: "left",
    minWidth: 100,
    format: (value) => value.toLocaleString("en-US"),
  },
];
