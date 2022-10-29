import { Grid } from '@mui/material';
import React from 'react'
import EnhancedTable from './Component/Table';

function App() {
  return (
    <div className="App">
      <Grid container className="containerGrid">
        <Grid item md={12} sm={12} xs={12}>
          <EnhancedTable />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
