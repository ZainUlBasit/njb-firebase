export const DailyColumns = [
    {
      id: "date",
      label: "Date",
      minWidth: 100,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "name",
      label: "Name",
      minWidth: 190,
      align: "left",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "desc",
      label: "Description",
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
      id: "purchase",
      label: "Purchase",
      minWidth: 100,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
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
  