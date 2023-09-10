import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faUser,
  faBoxOpen,
  faBuilding,
  faChartColumn,
  faMoneyCheck,
  faAddressCard,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

const SideBarData = [
  {
    key: "0",
    title: "Dashboard",
    path: "/",
    icon: faChartLine,
  },
  {
    key: "1",
    title: "Company",
    path: "/companies_info",
    icon: faBuilding,
  },
  {
    key: "2",
    title: "Items",
    path: "/items",
    icon: faBoxOpen,
  },
  {
    key: "3",
    title: "Customer",
    path: "/customer_info",
    icon: faUser,
  },
  {
    key: "4",
    title: "Reports",
    path: "/reports",
    icon: faChartColumn,
  },
  {
    key: "5",
    title: "Cash Payment",
    path: "/company-payment",
    icon: faMoneyCheck,
  },
];

export default SideBarData;
