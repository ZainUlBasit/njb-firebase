import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BillDetailColumns } from "../../assets/Columns/BillDetailColumns";

export default function BillTable({ rows }) {
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  const rowCellStyle = {
    fontFamily: "raleway",
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#032248",
  };
  return (
    <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          {/* to set the columns of the table */}
          <TableRow>
            {BillDetailColumns.map((item, index) => {
              return (
                <TableCell
                  key={index}
                  align={item.align}
                  style={{
                    minWidth: item.minWidth,
                    backgroundColor: "#032248",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    fontFamily: "'Raleway', sans-serif",
                    borderColor: "#032248",
                    borderWidth: "1px",
                    userSelect: "none",
                  }}
                >
                  {item.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((val, i) => (
            <TableRow key={i} style={{ border: "1px solid #032248" }}>
              <TableCell style={rowCellStyle}>{val.name}</TableCell>
              <TableCell align="right" style={rowCellStyle}>
                {val.qty}
              </TableCell>
              <TableCell align="right" style={rowCellStyle}>
                {val.price}
              </TableCell>
              <TableCell align="right" style={rowCellStyle}>
                {val.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
