import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const styles = {
  backgroundColor: "#032248",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.1rem",
  fontFamily: "'Raleway', sans-serif",
};
const stylesRows = {
  color: "#032248",
  // color: "white",
  fontWeight: "bold",
  fontSize: "1rem",
  fontFamily: "'Raleway', sans-serif",
};

export default function PaymentTableComponent({ rows }) {
  return (
    <div className="w-[90%]  border-[2px] border-[#032248]">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={styles}>Name</StyledTableCell>
              <StyledTableCell style={styles} align="right">
                Total Amount
              </StyledTableCell>
              <StyledTableCell style={styles} align="right">
                Paid Amount
              </StyledTableCell>
              <StyledTableCell style={styles} align="right">
                Remaining Amount
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.fullname || row.name}>
                <StyledTableCell component="th" scope="row" style={stylesRows}>
                  {row.fullname || row.name}
                </StyledTableCell>
                <StyledTableCell align="right" style={stylesRows}>
                  {row.total}
                </StyledTableCell>
                <StyledTableCell align="right" style={stylesRows}>
                  {row.paid}
                </StyledTableCell>
                <StyledTableCell align="right" style={stylesRows}>
                  {row.remaining}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
