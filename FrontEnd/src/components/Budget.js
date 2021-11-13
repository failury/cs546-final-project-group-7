import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';



export default function Budget() {
  return (
    <React.Fragment>
      <Title>Budget</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="Budget">
          View Budget
        </Link>
      </div>
    </React.Fragment>
  );
}