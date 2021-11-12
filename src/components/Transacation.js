import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
function createData(id, date, type, category, amount, memo) {
  return { id, date, type, category, amount, memo };
}

const rows = [
  createData(
    0,
    '16 Mar, 2021',
    'expense',
    'groceries',
    312.44,
    'groceries',
  ),
  createData(
    1,
    '16 Mar, 2021',
    'income',
    'category',
    312.44,
    'from your mon',
  ),
  createData(2, '16 Mar, 2019', 'expense', 'category', 100.81, 'utility'),
  createData(
    3,
    '16 Mar, 2021',
    'expense',
    'category',
    654.39,
    'my fuking rentmy fuking rentmy fuking rent',
  ),
  createData(
    4,
    '15 Mar, 2021',
    'income',
    'category',
    212.79,
    'gift from bro',
  ),
];
function deleteItem(i) {

  //
}
export default function Transaction(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Payment Date</TableCell>
            <TableCell>Payment Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Memo</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell align="right">{`${row.memo}`}</TableCell>
              <TableCell align="right">
                    <Button 
                    variant="contained"
                      onClick={deleteItem(i)}
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}